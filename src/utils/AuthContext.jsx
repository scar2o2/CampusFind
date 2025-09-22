import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in ms

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    if (!storedUser) return null;

    try {
      const parsed = JSON.parse(storedUser);
      // check expiry
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem("User");
        return null;
      }
      return parsed.value;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  // Save user to localStorage with expiry
  useEffect(() => {
    if (user) {
      const dataWithExpiry = {
        value: user,
        expiry: Date.now() + EXPIRATION_TIME,
      };
      localStorage.setItem("User", JSON.stringify(dataWithExpiry));
    } else {
      localStorage.removeItem("User");
    }
  }, [user]);

  // Auto logout when expiry time is reached
  useEffect(() => {
    if (!user) return;

    const storedUser = JSON.parse(localStorage.getItem("User"));
    if (!storedUser?.expiry) return;

    const timeout = storedUser.expiry - Date.now();
    const timer = setTimeout(() => setUser(null), timeout);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
