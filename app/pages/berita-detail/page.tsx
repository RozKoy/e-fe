import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const BeritaDetail = () => {
    return (
        <div>
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="bg-[#284C66] py-24 text-center text-white">
                    <h1 className="text-3xl font-semibold tracking-wide mb-3">
                        DETAIL BERITA
                    </h1>
                    <div className="text-sm text-gray-200">
                        <Link href="/" className="hover:underline">
                            Beranda
                        </Link>{" "}
                        <span className="mx-2">{">"}</span>
                        <span>Detail Berita</span>
                    </div>
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-12">
                    <Image
                        src="/berita.jpeg"
                        alt="PKB"
                        width={1920}
                        height={1080}
                        className="object-contain"
                    />
                    <div className="pt-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#284C66] text-white text-sm px-4 py-1 rounded-full">
                                Anggaran & Kebijakan Publik
                            </span>
                            <div className="flex items-center text-gray-600 text-sm gap-2">
                                <i className="ri-calendar-line"></i>
                                <span>17 November 2025</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-6">
                            Sekdaprov Lampung Ikuti Rapat Paripurna DPRD
                            Provinsi Lampung Terkait Laporan Panitia Khusus
                            BAPEMPERDA
                        </h1>
                        <div className="text-gray-700 leading-relaxed space-y-6">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipiscing elit. Quisque faucibus ex sapien
                                vitae pellentesque sem placerat. In id cursus mi
                                pretium tellus duis convallis. Tempus leo eu
                                aenean sed diam urna tempor. Pulvinar vivamus
                                fringilla lacus nec metus bibendum egestas.
                                Iaculis massa nisl malesuada lacinia integer
                                nunc posuere. Ut hendrerit semper vel class
                                aptent taciti sociosqu. Ad litora torquent per
                                conubia nostra inceptos himenaeos. Lorem ipsum
                                dolor sit amet consectetur adipiscing elit.
                                Quisque faucibus ex sapien vitae pellentesque
                                sem placerat. In id cursus mi pretium tellus
                                duis convallis. Tempus leo eu aenean sed diam
                                urna tempor. Pulvinar vivamus fringilla lacus
                                nec metus bibendum egestas. Iaculis massa nisl
                                malesuada lacinia integer nunc posuere. Ut
                                hendrerit semper vel class aptent taciti
                                sociosqu. Ad litora torquent per conubia nostra
                                inceptos himenaeos. Lorem ipsum dolor sit amet
                                consectetur adipiscing elit. Quisque faucibus ex
                                sapien vitae pellentesque sem placerat. In id
                                cursus mi pretium tellus duis convallis. Tempus
                                leo eu aenean sed diam urna tempor. Pulvinar
                                vivamus fringilla lacus nec metus bibendum
                                egestas. Iaculis massa nisl malesuada lacinia
                                integer nunc posuere. Ut hendrerit semper vel
                                class aptent taciti sociosqu. Ad litora torquent
                                per conubia nostra inceptos himenaeos.
                            </p>
                        </div>
                        <div className="border-b mt-12 mb-8"></div>
                        <h2 className="text-2xl font-bold text-[#284C66] mb-6">
                            Berita Lainnya
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BeritaDetail;
