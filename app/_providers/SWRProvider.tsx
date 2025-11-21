"use client";

import { SWRConfig } from "swr";
import Router from "next/router";
import { ROUTE_LISTS } from "../_constants/route";

//
interface SWRProviderProps {
    children: React.ReactNode;
}

//
async function fetcher(url: string) {
    const res = await fetch(url);

    if (res.status === 401) {
        Router.push(ROUTE_LISTS.get("login") ?? "/");
    }

    return res.json();
}

export function SWRProvider({ children }: SWRProviderProps) {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
