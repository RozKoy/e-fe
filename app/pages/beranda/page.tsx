"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Berita from "@/app/components/Berita";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Landing from "@/app/components/Landing";

const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
});

const BerandaPage = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 order-2 md:order-1">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
                            <span className="text-[#F19349] tracking-wider">
                                SELAMAT DATANG DI
                            </span>
                            <span className="text-[#284C66] px-4">
                                SISTEM INFORMASI
                            </span>
                            <br />
                            <span className="text-[#284C66]">
                                MANAJEMEN RESES
                            </span>
                            <br />
                            <span className="text-[#284C66]">DPRD PROVINSI LAMPUNG</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                        <div className="relative w-full h-sm:h-80 md:h-92">
                            <Image
                                src="/images/app-logo-fix.png"
                                alt="hola"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Map />
            <Landing />
            <Berita />
            <Footer />
        </div>
    );
};

export default BerandaPage;
