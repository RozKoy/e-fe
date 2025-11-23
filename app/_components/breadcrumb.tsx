"use client";

import Link from "next/link";
import { ChevronRightOutlined, HomeOutlined } from "@mui/icons-material";

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
            <HomeOutlined fontSize="small" />
            <p>Beranda</p>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    <ChevronRightOutlined fontSize="small" />
                    {item.path ? (
                        <Link href={item.path}>{item.name}</Link>
                    ) : (
                        <p>{item.name}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
