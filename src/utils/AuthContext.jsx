import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("User");
    try {
      return storedUser ? JSON.parse(storedUser) : { name: "", email: "", phone: "" };
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return { name: "", email: "", phone: "" };
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
    } else {
      localStorage.removeItem("User");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
