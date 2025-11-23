"use client";

import useSWR from "swr";
import { useEffect, useRef } from "react";
import { IResponse } from "../_types/api";
import { useAlert } from "./AlertProvider";
import { useRouter } from "next/navigation";
import { ROUTE_LISTS } from "../_constants/route";
import { AutorenewOutlined } from "@mui/icons-material";

//
interface AuthProviderProps {
    children: React.ReactNode;
}

//
export function AuthProvider({ children }: AuthProviderProps) {
    const alert = useAlert();
    const router = useRouter();

    const hasError = useRef<boolean>(false);

    const { data, isLoading } = useSWR<IResponse<object | null>>(
        ROUTE_LISTS.get("api-token-check")
    );

    const isAuth = !isLoading && data?.code !== 401;

    useEffect(() => {
        if (!hasError.current) {
            if (!isLoading && data?.code === 401 && !isAuth) {
                alert.clearAlert();
                hasError.current = true;
                router.push(ROUTE_LISTS.get("login") ?? "/");
            }
        }
    }, [data, alert, isAuth, router, isLoading]);

    return (
        <>
            {(isLoading || !isAuth) && (
                <div className="fixed z-50 w-full h-full flex items-center justify-center backdrop-blur">
                    <AutorenewOutlined
                        className="animate-spin"
                        fontSize="large"
                    />
                </div>
            )}
            {children}
        </>
    );
}
