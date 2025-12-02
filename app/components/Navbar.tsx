"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isClick, setIsClick] = useState(false);
    const pathname = usePathname();

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
                    <div className="flex items-center">
                        <span className="text-white text-lg font-semibold">
                            DPRD LAMPUNG
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-6">
                            <Link
                                href="/"
                                className={`${navLinkClass} ${isActive("/")}`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/pages/usulan"
                                className={`${navLinkClass} ${isActive(
                                    "/pages/usulan"
                                )}`}
                            >
                                Usulan
                            </Link>
                            <Link
                                href="/pages/anggota"
                                className={`${navLinkClass} ${isActive(
                                    "/pages/anggota"
                                )}`}
                            >
                                Anggota DPRD
                            </Link>
                            <Link
                                href="/pages/berita"
                                className={`${navLinkClass} ${isActive(
                                    "/pages/berita"
                                )}`}
                            >
                                Berita
                            </Link>
                            <Link href="/login" className={loginButtonClass}>
                                Masuk
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleNavbar}
                            className="p-2 text-white rounded-md"
                        >
                            {isClick ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className="md:hidden bg-[#284C66] px-4 pt-2 pb-4 space-y-2">
                    <Link
                        href="/"
                        className={`${navLinkClass} ${isActive("/")}`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/pages/usulan"
                        className={`${navLinkClass} ${isActive(
                            "/pages/usulan"
                        )}`}
                    >
                        Usulan
                    </Link>
                    <Link
                        href="/pages/anggota"
                        className={`${navLinkClass} ${isActive(
                            "/pages/anggota"
                        )}`}
                    >
                        Anggota DPRD
                    </Link>
                    <Link
                        href="/pages/berita"
                        className={`${navLinkClass} ${isActive(
                            "/pages/berita"
                        )}`}
                    >
                        Berita
                    </Link>
                    <Link href="/login" className={loginButtonClass}>
                        Masuk
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
