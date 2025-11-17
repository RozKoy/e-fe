import React from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";

const Partai = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-white min-h-screen">
                <div className="bg-[#284C66] py-24 text-center text-white">
                    <h1 className="text-3xl font-semibold tracking-wide mb-3">
                        PARTAI
                    </h1>
                    <div className="text-sm text-gray-200">
                        <Link href="/" className="hover:underline">
                            Beranda
                        </Link>{" "}
                        <span className="mx-2">{">"}</span>
                        <span>Partai</span>
                    </div>
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Kebangkitan Bangsa
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="PKB"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Amanat Nasional
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="PAN"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Gerakan Indonesia Raya
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="Gerindra"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Golongan Karya
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="Golkar"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Bulan Bintang
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="PBB"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Persatuan Pembangunan
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="PPP"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="border-b border-t border-gray-400 flex items-center justify-between bg-gray-100 p-5 shadow-sm">
                            <p className="text-lg font-semibold text-gray-800 w-2/3">
                                Partai Demokrasi Indonesia Perjuangan
                            </p>
                            <Image
                                src="/gerindra.png"
                                alt="PDIP"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Partai;
