import Link from "next/link";
import Berita from "@/app/components/Berita";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const BeritaPage = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-[#284C66] py-24 text-center text-white">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    BERITA
                </h1>
                <div className="text-sm text-gray-200">
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    {"/pages/berita-detail"}
                    <span className="mx-2">{">"}</span>
                    <span>Berita</span>
                </div>
            </div>
            <Berita pagination={true} />
            <Footer />
        </div>
    );
};

export default BeritaPage;
