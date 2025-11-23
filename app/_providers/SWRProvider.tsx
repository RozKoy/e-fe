"use client";

import { SWRConfig } from "swr";

//
interface SWRProviderProps {
    children: React.ReactNode;
}

//
async function fetcher(url: string) {
    const response = await fetch(url);

    return {
        ...(await response.json()),
        code: response.status,
    };
}

export function SWRProvider({ children }: SWRProviderProps) {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
