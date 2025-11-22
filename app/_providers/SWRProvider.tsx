"use client";

import { SWRConfig } from "swr";

//
interface SWRProviderProps {
    children: React.ReactNode;
}

//
async function fetcher(url: string) {
    const res = await fetch(url);

    return res.json();
}

export function SWRProvider({ children }: SWRProviderProps) {
    return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
