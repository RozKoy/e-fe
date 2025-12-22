"use client";

import { AutorenewOutlined } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";

//
interface LoadingProviderProps {
    children: React.ReactNode;
}

export interface LoadingContextValue {
    rootLoading: boolean;
    setRootLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//
const LoadingContext = createContext<LoadingContextValue | null>(null);

//
export function LoadingProvider({ children }: LoadingProviderProps) {
    const [loading, setLoading] = useState(true);

    return (
        <LoadingContext.Provider
            value={{ rootLoading: loading, setRootLoading: setLoading }}
        >
            {loading && (
                <div className="fixed z-50 w-full h-full flex items-center justify-center backdrop-blur">
                    <AutorenewOutlined
                        className="animate-spin"
                        fontSize="large"
                    />
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const ctx = useContext(LoadingContext);

    if (!ctx) {
        throw new Error("useLoading must be used inside LoadingProvider");
    }

    return ctx;
};
