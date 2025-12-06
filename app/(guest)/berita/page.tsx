import Link from "next/link";
import Article from "../_components/article";

//
export default function ArticlePage() {
    return (
        <>
            <div className="bg-[#284C66] py-24 text-center text-white">
                <h1 className="text-3xl font-semibold tracking-wide mb-3">
                    BERITA
                </h1>
                <div className="text-sm text-gray-200">
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <span>Berita</span>
                </div>
            </div>
            <Article pagination={true} />
        </>
    );
}
