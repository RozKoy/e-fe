"use client";

import {
    MapOutlined,
    MenuOutlined,
    BadgeOutlined,
    CloseOutlined,
    LogoutOutlined,
    CategoryOutlined,
    DashboardOutlined,
    PeopleAltOutlined,
    WorkspacesOutline,
    Diversity2Outlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { usePathname, useRouter } from "next/navigation";
import { useAlert } from "@/app/_providers/AlertProvider";
import { SWRProvider } from "@/app/_providers/SWRProvider";
import { AuthProvider } from "@/app/_providers/AuthProvider";

//
interface MenuListInterface {
    icon: React.ReactNode;
    path: string | undefined;
    title: string;
}

interface MenuButtonProps {
    open: boolean;
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    className?: React.ButtonHTMLAttributes<HTMLButtonElement>["className"];
}

interface MenuItemProps {
    icon: React.ReactNode;
    path: string;
    title: string;
    active: boolean;
}

interface AdminLayoutProps {
    children: React.ReactNode;
}

//
const MENU_LIST: MenuListInterface[] = [
    {
        icon: <DashboardOutlined />,
        path: ROUTE_LISTS.get("dashboard"),
        title: "Beranda",
    },
    {
        icon: <CategoryOutlined />,
        path: ROUTE_LISTS.get("category"),
        title: "Kategori",
    },
    {
        icon: <MapOutlined />,
        path: ROUTE_LISTS.get("area"),
        title: "Area",
    },
    {
        icon: <Diversity2Outlined />,
        path: ROUTE_LISTS.get("fraction"),
        title: "Partai",
    },
    {
        icon: <BadgeOutlined />,
        path: ROUTE_LISTS.get("access"),
        title: "Akses Pengguna",
    },
    {
        icon: <PeopleAltOutlined />,
        path: ROUTE_LISTS.get("user"),
        title: "Pengguna",
    },
    {
        icon: <WorkspacesOutline />,
        path: ROUTE_LISTS.get("role"),
        title: "Peran",
    },
];

//
function MenuButton({ open, onClick, className }: MenuButtonProps) {
    return (
        <button
            type="button"
            className={`${className} xl:hidden p-1.5 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all`}
            onClick={onClick}
        >
            {open ? <CloseOutlined /> : <MenuOutlined />}
        </button>
    );
}

function MenuItem({ icon, path, title, active }: MenuItemProps) {
    return (
        <Link
            href={path}
            className={`${
                active ? "border-black/10" : "border-transparent"
            } p-2 rounded-lg hover:bg-black/5 border-2 flex gap-3 transition-all`}
        >
            {icon}
            <p>{title}</p>
        </Link>
    );
}

//
export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
    const alert = useAlert();
    const router = useRouter();
    const pathname: string = usePathname();

    const [open, setOpen] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const menuHandle = () => {
        setOpen((prev) => !prev);
    };

    const logoutHandle = async () => {
        const url = ROUTE_LISTS.get("local-logout");
        const loginUrl = ROUTE_LISTS.get("login");

        if (!url || !loginUrl) {
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
            router.replace(loginUrl);
        }, 500);
    };

    return (
        <SWRProvider>
            <AuthProvider>
                <div className="w-screen h-screen flex overflow-hidden">
                    {open && (
                        <div
                            className="absolute z-40 xl:hidden w-full h-full backdrop-blur-xs"
                            onClick={menuHandle}
                        ></div>
                    )}
                    <aside
                        className={`${
                            !open && "-translate-x-full xl:translate-x-0"
                        } absolute z-40 left-0 top-0 w-80 h-full bg-white flex flex-col overflow-x-hidden overflow-y-auto transition-all`}
                    >
                        <MenuButton
                            open={open}
                            onClick={menuHandle}
                            className="absolute top-3 right-3"
                        />
                        <div className="h-52 mx-16 my-5 bg-gray-100"></div>
                        <div className="h-full my-8 px-10 space-y-3 overflow-x-hidden overflow-y-auto">
                            {MENU_LIST.map((menu, index) => (
                                <MenuItem
                                    key={index}
                                    icon={menu.icon}
                                    path={menu.path ?? "#"}
                                    title={menu.title}
                                    active={
                                        menu.path
                                            ? pathname.startsWith(menu.path)
                                            : false
                                    }
                                />
                            ))}
                        </div>
                    </aside>
                    <div className="relative w-full h-full xl:ml-80 bg-gray-100 flex flex-col overflow-x-hidden overflow-y-auto transition-all">
                        <nav className="sticky z-30 top-0 p-5 bg-white flex items-center">
                            <MenuButton open={open} onClick={menuHandle} />
                            <button
                                type="button"
                                className="w-8 md:w-10 aspect-square ml-auto rounded-full bg-[url('/images/user.png')] bg-center bg-cover bg-no-repeat shadow/30 hover:shadow/50 cursor-pointer transition-all"
                                onClick={() => setOpenProfile((prev) => !prev)}
                            ></button>
                            <div
                                className={`${
                                    openProfile
                                        ? "visible top-[110%]"
                                        : "invisible top-full"
                                } absolute right-5 p-1.5 rounded-lg bg-white shadow transition-all`}
                            >
                                <button
                                    className="min-w-32 p-2 rounded-lg hover:bg-gray-100 flex items-center justify-start transition-all"
                                    onClick={logoutHandle}
                                >
                                    <LogoutOutlined fontSize="small" />
                                    <p>Keluar</p>
                                </button>
                            </div>
                        </nav>
                        <main className="m-5 p-5 rounded-2xl bg-white space-y-5">
                            {children}
                        </main>
                        <footer className="px-5 pb-5">
                            <p className="text-center text-gray-500">
                                &copy; 2025 DPRD Lampung. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </AuthProvider>
        </SWRProvider>
    );
}
