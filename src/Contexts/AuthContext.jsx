
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token") ??"");

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         setUserToken(token);
    //     }
    // }, []); // The empty dependency array ensures this effect runs only once after the initial render.

    return (
        <AuthContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </AuthContext.Provider>
    );
}
