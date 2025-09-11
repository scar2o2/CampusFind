import { createContext, useContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        if(user){
            localStorage.setItem("User",user);
        }
        else{
            localStorage.removeItem("User");
        }
    },[user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
