"use client";

import useSWR from "swr";
import { IUser } from "../_types/user";
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

    const checkTimer = useRef<NodeJS.Timeout | undefined>(undefined);

    const hasError = useRef<boolean>(false);
    const hasMutateStatus = useRef<number>(0);

    const { data, mutate, isLoading } = useSWR<IResponse<IUser>>(
        ROUTE_LISTS.get("api-profile-get")
    );

    const isAuth =
        !isLoading && data?.code !== 401 && data?.data?.role !== null;

    useEffect(() => {
        const check = async () => {
            if (!hasMutateStatus.current) {
                hasMutateStatus.current = 1;
                await mutate();
                hasMutateStatus.current = 2;
            } else {
                clearTimeout(checkTimer.current);
                checkTimer.current = setTimeout(() => {
                    if (
                        hasMutateStatus.current === 2 &&
                        !isLoading &&
                        (data?.code === 401 || data?.data?.role === null)
                    ) {
                        alert.clearAlert();
                        hasError.current = true;
                        hasMutateStatus.current = 0;
                        router.push(ROUTE_LISTS.get("login") ?? "/");
                    } else if (isLoading) {
                        check();
                    }
                }, 750);
            }
        };
        if (!hasError.current) {
            check();
        }
    }, [data, alert, mutate, router, isLoading]);

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
