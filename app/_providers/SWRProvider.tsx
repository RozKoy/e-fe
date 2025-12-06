"use client";

import { SWRConfig } from "swr";
import { ROUTE_LISTS } from "../_constants/route";

//
interface SWRProviderProps {
    children: React.ReactNode;
}

//
async function fetcher(url: string) {
    const response = await fetch(url);

    if (
        response.status === 401 &&
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin")
    ) {
        window.location.href = ROUTE_LISTS.get("login") ?? "/";
    }

    return {
        ...(await response.json()),
        code: response.status,
    };
}

export function SWRProvider({ children }: SWRProviderProps) {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
