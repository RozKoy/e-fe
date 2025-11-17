"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isClick, setisClick] = useState(false);
    const toggleNavber = (): void => {
        setisClick(!isClick);
    };

    const navLinkClass =
        "block text-white hover:text-gray-900 lg p-2 transition duration-150 ease-in-out";
    const activeLinkClass =
        "block text-white border-b-2 border-black font-medium pb-1";
    const loginButtonClass =
        "block bg-[#F19349] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A4E] transition duration-150 ease-in-out font-medium";
    return (
        <>
            <nav className="bg-[#284C66] shadow-sm top-0">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center">
                            <div className="flex shrink-0">
                                <span className="text-white text-lg font-semibold whitespace-nowrap">
                                    DPRD LAMPUNG
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className={`${navLinkClass} ${activeLinkClass}`}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/pages/usulan"
                                    className={navLinkClass}
                                >
                                    Usulan
                                </Link>
                                <Link
                                    href="/pages/anggota"
                                    className={navLinkClass}
                                >
                                    Anggota DPRD
                                </Link>
                                <Link
                                    href="/pages/berita"
                                    className={navLinkClass}
                                >
                                    Berita
                                </Link>
                                <Link
                                    href="/login"
                                    className={loginButtonClass}
                                >
                                    Masuk
                                </Link>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={toggleNavber}
                            >
                                {isClick ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
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
                                        xmlns="http://www.w3.org/2000/svg"
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
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 spaye-y-1 sm:px-3">
                            <Link
                                href="/"
                                className={`${navLinkClass} ${activeLinkClass}`}
                            >
                                Beranda
                            </Link>
                            <Link href="/pages/usulan" className={navLinkClass}>
                                Usulan
                            </Link>
                            <Link
                                href="/pages/anggota"
                                className={navLinkClass}
                            >
                                Anggota DPRD
                            </Link>
                            <Link href="/pages/berita" className={navLinkClass}>
                                Berita
                            </Link>
                            <Link href="/login" className={loginButtonClass}>
                                Masuk
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
