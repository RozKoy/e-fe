import Link from "next/link";
import Image from "next/image";

//
interface FooterProps {
    links: LinkItem[];
}

interface LinkItem {
    name: string;
    href: string;
}

//
export default function Footer({ links }: FooterProps) {
    return (
        <footer className="bg-[#284C66] text-white">
            <div className="max-w-8xl mx-auto px-6 sm:px-8">
                <div className="py-6 flex items-start space-x-4">
                    <div className="shrink-0 pt-1">
                        <Image
                            src="/images/lampung-logo.png"
                            alt="Logo DPRD Lampung"
                            width={45}
                            height={45}
                            className="object-contain"
                        />
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed">
                        <span className="font-bold">
                            E-RESES DPRD PROVINSI LAMPUNG
                        </span>{" "}
                        merupakan platform digital untuk masyarakat mengajukan
                        aspirasi secara langsung kepada DPRD Provinsi Lampung.
                        Mari bersama wujudkan pembangunan yang lebih baik!
                    </p>
                </div>
                <hr className="border-t border-white/30" />
                <div className="flex justify-between items-center py-4">
                    <p className="text-xs sm:text-sm">&copy; E-RESES 2025</p>
                    <nav className="flex space-x-4 sm:space-x-6 text-sm">
                        {links.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="font-medium hover:text-gray-300 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
