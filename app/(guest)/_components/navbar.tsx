"use client";

import {
    MenuOutlined,
    CloseOutlined,
    LogoutOutlined,
    AutorenewOutlined,
    DashboardOutlined,
    ManageAccountsOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/app/_types/user";
import { usePathname } from "next/navigation";
import { SetStateAction, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { useAlert } from "@/app/_providers/AlertProvider";

//
interface NavbarProps {
    user?: IUser | undefined;
    links: LinkItem[];
    loading?: boolean;
    setShowProfile: React.Dispatch<SetStateAction<boolean>>;
}

interface LinkItem {
    name: string;
    href: string;
}

//
export default function Navbar({
    user,
    links,
    loading,
    setShowProfile,
}: NavbarProps) {
    const alert = useAlert();
    const pathname = usePathname();

    const [isClick, setIsClick] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const toggleNavbar = (): void => {
        setIsClick(!isClick);
    };
    const navLinkClass =
        "block text-white hover:text-gray-300 px-2 transition duration-150 ease-in-out";
    const loginButtonClass =
        "block bg-[#F19349] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A4E] transition duration-150 ease-in-out font-medium";

    const isActive = (path: string) =>
        pathname === path ? "border-b-2 border-white pb-1 font-semibold" : "";

    const logoutHandle = async () => {
        const url = ROUTE_LISTS.get("local-logout");

        if (!url) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        await fetch(url);

        alert.addAlert({
            type: "success",
            message: "Berhasil keluar",
        });

        setTimeout(() => {
            if (window?.location) {
                window.location.reload();
            }
        }, 500);
    };

    return (
        <nav className="sticky z-40 bg-[#284C66] shadow-sm top-0">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/lampung-logo.png"
                            alt="Logo DPRD Lampung"
                            width={45}
                            height={45}
                            className="object-contain"
                        />
                        <span className="text-white text-lg font-semibold">
                            DPRD PROVINSI LAMPUNG
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-6">
                            {links.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`${navLinkClass} ${isActive(
                                        item.href
                                    )}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {loading && (
                                <div className="text-white">
                                    <AutorenewOutlined
                                        className="animate-spin"
                                        fontSize="medium"
                                    />
                                </div>
                            )}
                            {!loading && !user && (
                                <Link
                                    href={ROUTE_LISTS.get("login") ?? "/"}
                                    className={loginButtonClass}
                                >
                                    Masuk
                                </Link>
                            )}
                            {!loading && user && (
                                <>
                                    <button
                                        type="button"
                                        className="relative w-8 md:w-10 aspect-square ml-auto rounded-full bg-white shadow/30 hover:shadow/50 flex items-center justify-center overflow-hidden cursor-pointer transition-all"
                                        onClick={() =>
                                            setOpenProfile((prev) => !prev)
                                        }
                                    >
                                        <Image
                                            src={
                                                user?.profile?.imageUrl ??
                                                "/images/user.png"
                                            }
                                            alt="user"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            unoptimized
                                        />
                                    </button>
                                    <div
                                        className={`${
                                            openProfile
                                                ? "visible top-[110%]"
                                                : "invisible top-full"
                                        } absolute right-5 p-1.5 rounded-lg bg-white shadow transition-all`}
                                    >
                                        {user.role && (
                                            <Link
                                                href={
                                                    ROUTE_LISTS.get(
                                                        "dashboard"
                                                    ) ?? "/"
                                                }
                                                className="min-w-36 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 flex gap-1 items-center justify-start text-primary transition-all"
                                            >
                                                <DashboardOutlined fontSize="small" />
                                                <p>Dashboard</p>
                                            </Link>
                                        )}
                                        <button
                                            className="min-w-36 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 flex gap-1 items-center justify-start text-primary transition-all"
                                            onClick={() => setShowProfile(true)}
                                        >
                                            <ManageAccountsOutlined fontSize="small" />
                                            <p>Profil</p>
                                        </button>
                                        <button
                                            className="min-w-36 p-2 hover:pl-3 rounded-lg hover:bg-gray-100 flex gap-1 items-center justify-start text-primary transition-all"
                                            onClick={logoutHandle}
                                        >
                                            <LogoutOutlined fontSize="small" />
                                            <p>Keluar</p>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleNavbar}
                            className="p-2 text-white rounded-md"
                        >
                            {isClick ? <CloseOutlined /> : <MenuOutlined />}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className="md:hidden bg-[#284C66] px-4 pt-2 pb-4 space-y-3">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`${navLinkClass} ${isActive(item.href)}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href={ROUTE_LISTS.get("login") ?? "/"}
                        className={loginButtonClass}
                    >
                        Masuk
                    </Link>
                </div>
            )}
        </nav>
    );
}
