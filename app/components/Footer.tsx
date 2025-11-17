import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#284C66] text-white">
                <div className="max-w-8xl mx-auto px-6 sm:px-8">
                    <div className="py-6 flex items-start space-x-4">
                        <div className="shrink-0 pt-1">
                            {/* <Image
                            src=""
                            alt="Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        /> */}
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed">
                            <span className="font-bold">
                                SIMRESES DPRD LAMPUNG
                            </span>{" "}
                            adalah platform digital untuk masyarakat mengajukan
                            aspirasi secara langsung kepada DPRD Provinsi
                            Lampung. Mari bersama wujudkan pembangunan yang
                            lebih baik!
                        </p>
                    </div>
                    <hr className="border-t border-white/30" />
                    <div className="flex justify-between items-center py-4">
                        <p className="text-xs sm:text-sm">
                            &copy; SIMRESES 2025
                        </p>
                        <nav className="flex space-x-4 sm:space-x-6 text-sm">
                            <Link
                                href="/"
                                className="font-bold hover:text-gray-300 transition-colors"
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/pages/usulan"
                                className="text-gray-200 hover:text-gray-300 transition-colors"
                            >
                                Usulan
                            </Link>
                            <Link
                                href="/pages/anggota"
                                className="text-gray-200 hover:text-gray-300 transition-colors"
                            >
                                Anggota
                            </Link>
                            <Link
                                href="/pages/berita"
                                className="text-gray-200 hover:text-gray-300 transition-colors"
                            >
                                Berita
                            </Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
