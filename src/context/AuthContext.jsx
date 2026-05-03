import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("user-details") || null));

    function signup(data) {
        const systemUsers = JSON.parse(localStorage.getItem("systemUsers") || "[]");

        let errors = {};

        if (systemUsers.find(u => u.email === data.email)) {
            errors.email = "The email has already been taken.";
        }

        if (systemUsers.find(u => u.phone === data.phone)) {
            errors.phone = "The phone has already been taken."
        }

        if (data.confirmPass !== data.password) {
            errors.password = "The password field confirmation does not match.";
        }

        if (Object.keys(errors).length > 0) {
            return { success: false, errors };
        }

        systemUsers.push(data);
        localStorage.setItem("systemUsers", JSON.stringify(systemUsers));
        setUserDetails(data);
        localStorage.setItem("user-details", JSON.stringify(data));

        return { success: true };
    }

    function login(email, password) {
        const systemUsers = JSON.parse(localStorage.getItem("systemUsers") || "[]");

        const user = systemUsers.find(user => user.email === email);

        if (!user) {
            return { success: false, errors: { error: "Invalid credentials" } };
        }

        if ((user.email !== email) || (user.password !== password)) {
            return { success: false, errors: { error: "Invalid credentials" } };
        }

        setUserDetails(user);
        localStorage.setItem("user-details", JSON.stringify(user));
        return { success: true };
    }

    return (
        <AuthContext.Provider value={{ signup, login, userDetails }}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}