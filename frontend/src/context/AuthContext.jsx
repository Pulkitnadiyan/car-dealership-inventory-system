import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    const login = (jwt) => {
        setToken(jwt);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}