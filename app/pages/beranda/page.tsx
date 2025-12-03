"use client";

import useSWR from "swr";
import Image from "next/image";
import dynamic from "next/dynamic";
import { IArea } from "@/app/_types/area";
import { IResponse } from "@/app/_types/api";
import Berita from "@/app/components/Berita";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Landing from "@/app/components/Landing";
import { ROUTE_LISTS } from "@/app/_constants/route";

const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
});

const BerandaPage = () => {
    const {
        data: dataArea,
        // error: errorArea,
        // mutate: mutateArea,
        isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-public-area-get")}`);

    return (
        <div>
            <Navbar />
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 order-2 md:order-1">
                        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight mb-6">
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
                            <span className="text-[#284C66]">DPRD LAMPUNG</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                        <div className="relative w-full h-sm:h-80 md:h-96">
                            <Image
                                src="/ilustrasi.png"
                                alt="hola"
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Map data={dataArea?.data} loading={isLoadingArea} />
            <Landing data={dataArea?.data} loading={isLoadingArea} />
            <Berita />
            <Footer />
        </div>
    );
};

export default BerandaPage;
