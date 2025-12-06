"use client";

import { IUser } from "../_types/user";
import { createContext, useContext, useState } from "react";

interface UserContextValue {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("useUser must be used inside UserProvider");
    }

    return ctx;
};
