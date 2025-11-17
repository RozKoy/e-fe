"use client";

import {
    IconData,
    XmarkOutlined,
    UserMultiple4Outlined,
    MenuHamburger1Outlined,
} from "@lineiconshq/free-icons";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";

//
interface MenuListInterface {
    icon: IconData;
    path: string | undefined;
    title: string;
}

interface MenuButtonProps {
    open: boolean;
    handle: MouseEventHandler;
    className?: string;
}

interface MenuItemProps {
    icon: IconData;
    title: string;
    active: boolean;
}

interface AdminLayoutProps {
    children: React.ReactNode;
}

//
const MENU_LIST: MenuListInterface[] = [
    {
        icon: UserMultiple4Outlined,
        path: ROUTE_LISTS.get("user"),
        title: "Pengguna",
    },
];

//
function MenuButton({ open, handle, className }: MenuButtonProps) {
    return (
        <button
            type="button"
            className={`${className} xl:hidden p-1.5 rounded-lg bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all`}
            onClick={handle}
        >
            {open ? (
                <Lineicons icon={XmarkOutlined} />
            ) : (
                <Lineicons icon={MenuHamburger1Outlined} />
            )}
        </button>
    );
}

function MenuItem({ icon, title, active }: MenuItemProps) {
    return (
        <div
            className={`${
                active && "border-2 border-black/10"
            } p-3 rounded-lg hover:bg-black/5 flex gap-3 transition-all`}
        >
            <Lineicons icon={icon} />
            <p>{title}</p>
        </div>
    );
}

//
export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
    const pathname: string = usePathname();

    const [open, setOpen] = useState<boolean>(false);

    const menuHandle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="w-screen h-screen flex overflow-hidden">
            {/* Blur Backdrop */}
            {open && (
                <div
                    className="absolute z-40 xl:hidden w-full h-full backdrop-blur-xs"
                    onClick={menuHandle}
                ></div>
            )}
            {/* Sidebar */}
            <aside
                className={`${
                    !open && "-translate-x-full xl:translate-x-0"
                } absolute z-40 left-0 top-0 w-80 h-full bg-white flex flex-col overflow-x-hidden overflow-y-auto transition-all`}
            >
                <MenuButton
                    open={open}
                    handle={menuHandle}
                    className="absolute top-3 right-3"
                />
                <div className="h-52 mx-16 my-5 bg-gray-100"></div>
                {/* Sidebar Items */}
                <div className="h-full my-8 px-10 space-y-5 overflow-x-hidden overflow-y-auto">
                    {MENU_LIST.map((menu, index) => (
                        <MenuItem
                            key={index}
                            icon={menu.icon}
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
                {/* Navbar */}
                <nav className="sticky z-30 top-0 p-5 bg-white flex items-center">
                    <MenuButton open={open} handle={menuHandle} />
                    <p className="ml-auto">USER</p>
                </nav>
                {/* Main Content */}
                <main className="m-5 p-5 rounded-2xl bg-white space-y-5">
                    {children}
                </main>
                {/* Footer */}
                <footer className="px-5 pb-5">
                    <p className="text-center text-gray-500">
                        &copy; 2025 DPRD Lampung. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
