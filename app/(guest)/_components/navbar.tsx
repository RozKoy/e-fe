"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { CloseOutlined, MenuOutlined } from "@mui/icons-material";

//
const links = [
    {
        name: "Beranda",
        href: "/",
    },
    {
        name: "Usulan",
        href: ROUTE_LISTS.get("public-proposal") ?? "/",
    },
    {
        name: "Anggota DPRD",
        href: ROUTE_LISTS.get("public-member") ?? "/",
    },
    {
        name: "Berita",
        href: ROUTE_LISTS.get("public-article") ?? "/",
    },
];

//
export default function Navbar() {
    const pathname = usePathname();

    const [isClick, setIsClick] = useState<boolean>(false);

    const toggleNavbar = (): void => {
        setIsClick(!isClick);
    };
    const navLinkClass =
        "block text-white hover:text-gray-300 px-2 transition duration-150 ease-in-out";
    const loginButtonClass =
        "block bg-[#F19349] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A4E] transition duration-150 ease-in-out font-medium";

    const isActive = (path: string) =>
        pathname === path ? "border-b-2 border-white pb-1 font-semibold" : "";

    return (
        <nav className="bg-[#284C66] shadow-sm top-0">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/lampung-logo.png"
                            alt="Logo DPRD Lampung"
                            width={45}
                            height={45}
                            className="object-contain"
                        />
                        <span className="text-white text-lg font-semibold">
                            DPRD PROVINSI LAMPUNG
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-6">
                            {links.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`${navLinkClass} ${isActive(
                                        item.href
                                    )}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href={ROUTE_LISTS.get("login") ?? "/"}
                                className={loginButtonClass}
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleNavbar}
                            className="p-2 text-white rounded-md"
                        >
                            {isClick ? <CloseOutlined /> : <MenuOutlined />}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className="md:hidden bg-[#284C66] px-4 pt-2 pb-4 space-y-3">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`${navLinkClass} ${isActive(item.href)}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href={ROUTE_LISTS.get("login") ?? "/"}
                        className={loginButtonClass}
                    >
                        Masuk
                    </Link>
                </div>
            )}
        </nav>
    );
}
