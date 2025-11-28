"use client";

import Link from "next/link";
import { ROUTE_LISTS } from "../_constants/route";
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
            <Link
                href={ROUTE_LISTS.get("dashboard") ?? "/"}
                className="flex items-center gap-1 hover:text-primary transition-all"
            >
                <HomeOutlined fontSize="small" />
                <p>Beranda</p>
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    <ChevronRightOutlined fontSize="small" />
                    {item.path ? (
                        <Link
                            href={item.path}
                            className="hover:text-primary transition-all"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <p>{item.name}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
