"use client";

import Link from "next/link";
import Lineicons from "@lineiconshq/react-lineicons";
import { ChevronLeftOutlined, Home2Outlined } from "@lineiconshq/free-icons";

//
interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
    name: string;
    path?: string;
}

//
export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div className="flex items-center gap-1 text-sm">
            <Lineicons icon={Home2Outlined} className="w-5" />
            <p>Beranda</p>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    <Lineicons
                        icon={ChevronLeftOutlined}
                        className="w-5 rotate-180"
                    />
                    {item.path ? (
                        <Link href={item.path}></Link>
                    ) : (
                        <p>{item.name}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
