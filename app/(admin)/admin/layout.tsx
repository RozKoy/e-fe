"use client";

import {
    MapOutlined,
    WorkOutline,
    MenuOutlined,
    BadgeOutlined,
    CloseOutlined,
    LogoutOutlined,
    CategoryOutlined,
    DashboardOutlined,
    PeopleAltOutlined,
    WorkspacesOutline,
    Diversity2Outlined,
    FilterFramesOutlined,
    ManageAccountsOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IUser } from "@/app/_types/user";
import Label from "@/app/_components/label";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { usePathname, useRouter } from "next/navigation";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";
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
        icon: <BadgeOutlined />,
        path: ROUTE_LISTS.get("access"),
        title: "Akses Pengguna",
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
        icon: <PeopleAltOutlined />,
        path: ROUTE_LISTS.get("user"),
        title: "Pengguna",
    },
    {
        icon: <WorkOutline />,
        path: ROUTE_LISTS.get("position"),
        title: "Posisi",
    },
    {
        icon: <FilterFramesOutlined />,
        path: ROUTE_LISTS.get("commission"),
        title: "Komisi",
    },
    {
        icon: <WorkspacesOutline />,
        path: ROUTE_LISTS.get("role"),
        title: "Peran",
    },
];

const genderOptions = [
    {
        value: "l",
        label: "Laki-laki",
    },
    {
        value: "p",
        label: "Perempuan",
    },
];

//
function MenuButton({ open, onClick, className }: MenuButtonProps) {
    return (
        <button
            type="button"
            className={`${className} xl:hidden p-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 flex items-center justify-center text-primary transition-all`}
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
                active
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "hover:pl-3 hover:bg-gray-100 text-primary"
            } p-2 rounded-lg flex items-center gap-3 transition-all`}
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

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const {
        data: dataProfile,
        // error: errorProfile,
        mutate: mutateProfile,
        // isLoading: isLoadingProfile,
    } = useSWR<IResponse<IUser>>(`${ROUTE_LISTS.get("api-profile-get")}`);

    const menuHandle = () => {
        setOpen((prev) => !prev);
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        let url = ROUTE_LISTS.get("api-profile-update");

        if (!url || !dataProfile?.data?.profile?.id) {
            setLoading(false);

            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        url = url.replace(":id", dataProfile.data.profile.id);

        const formData = new FormData(e.currentTarget);

        const res = await fetch(url, {
            method: "PUT",
            body: formData,
        });

        const response = await res.json();

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil mengubah profil",
            });

            setShowProfile(false);

            await mutateProfile();
        } else {
            if (Array.isArray(response.message)) {
                setErrors(badRequestResponseFormat(response.message));
            } else {
                setErrorMessage(response.message);

                alert.addAlert({
                    type: "error",
                    message: "Gagal mengubah profil",
                });
            }
        }
        setLoading(false);
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
                    <div className="relative h-52 mx-16 my-5">
                        <Image
                            src="/images/app-logo.png"
                            alt="logo"
                            style={{ objectFit: "cover" }}
                            fill
                        />
                    </div>
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
                            className="relative w-8 md:w-10 aspect-square ml-auto rounded-full shadow/30 hover:shadow/50 flex items-center justify-center overflow-hidden cursor-pointer transition-all"
                            onClick={() => setOpenProfile((prev) => !prev)}
                        >
                            <Image
                                src={
                                    dataProfile?.data?.profile?.imageUrl ??
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
                    </nav>
                    <main className="m-5 p-5 rounded-2xl bg-white space-y-5">
                        {children}
                        {showProfile && (
                            <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                                <div
                                    className="absolute w-full h-full backdrop-blur-xs"
                                    onClick={() => setShowProfile(false)}
                                ></div>
                                <form
                                    onSubmit={submit}
                                    className="relative min-w-4xl p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3"
                                >
                                    <button
                                        type="button"
                                        className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                                        onClick={() => setShowProfile(false)}
                                    >
                                        <CloseOutlined />
                                    </button>
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                                        <Label
                                            text="Nama"
                                            error={errors?.get("name")}
                                            required
                                        >
                                            <Input
                                                name="name"
                                                error={errors?.get("name")}
                                                placeholder="Masukkan nama"
                                                defaultValue={
                                                    dataProfile?.data?.profile
                                                        ?.name ?? ""
                                                }
                                                onInput={() =>
                                                    setErrors((prev) => {
                                                        prev?.delete("name");
                                                        return prev?.size
                                                            ? prev
                                                            : null;
                                                    })
                                                }
                                            />
                                        </Label>
                                        <Label
                                            text="Nomor HP"
                                            error={errors?.get("phoneNumber")}
                                            required
                                        >
                                            <Input
                                                type="tel"
                                                name="phoneNumber"
                                                error={errors?.get(
                                                    "phoneNumber"
                                                )}
                                                placeholder="Masukkan nomor hp"
                                                defaultValue={
                                                    dataProfile?.data?.profile
                                                        ?.phoneNumber ?? ""
                                                }
                                                onInput={() =>
                                                    setErrors((prev) => {
                                                        prev?.delete(
                                                            "phoneNumber"
                                                        );
                                                        return prev?.size
                                                            ? prev
                                                            : null;
                                                    })
                                                }
                                            />
                                        </Label>
                                        <Label
                                            text="Jenis Kelamin"
                                            error={errors?.get("gender")}
                                        >
                                            <Select
                                                name="gender"
                                                error={errors?.get("gender")}
                                                placeholder="Pilih jenis kelamin"
                                                defaultValue={
                                                    dataProfile?.data?.profile
                                                        ?.gender ?? ""
                                                }
                                                onChange={() => {
                                                    setErrors((prev) => {
                                                        prev?.delete("gender");
                                                        return prev?.size
                                                            ? prev
                                                            : null;
                                                    });
                                                }}
                                            >
                                                {genderOptions.map(
                                                    (item, index) => (
                                                        <option
                                                            key={index}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </option>
                                                    )
                                                )}
                                            </Select>
                                        </Label>
                                        <Label
                                            text="Umur"
                                            error={errors?.get("age")}
                                        >
                                            <Input
                                                type="number"
                                                name="age"
                                                error={errors?.get("age")}
                                                placeholder="Masukkan umur"
                                                defaultValue={
                                                    dataProfile?.data?.profile
                                                        ?.age ?? ""
                                                }
                                                onInput={() =>
                                                    setErrors((prev) => {
                                                        prev?.delete("age");
                                                        return prev?.size
                                                            ? prev
                                                            : null;
                                                    })
                                                }
                                            />
                                        </Label>
                                        <div className="md:col-span-2">
                                            <Label
                                                text="Gambar"
                                                error={errors?.get("image")}
                                            >
                                                <File
                                                    name="image"
                                                    note="PNG, JPG, dll"
                                                    error={errors?.get("image")}
                                                    onChange={() =>
                                                        setErrors((prev) => {
                                                            prev?.delete(
                                                                "image"
                                                            );
                                                            return prev?.size
                                                                ? prev
                                                                : null;
                                                        })
                                                    }
                                                />
                                            </Label>
                                        </div>
                                        <p className="md:col-span-2 text-red-500 text-center">
                                            {errorMessage && errorMessage}
                                        </p>
                                    </div>
                                    <div className="w-full mt-3 flex gap-3 items-center justify-end">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                setShowProfile(false)
                                            }
                                        >
                                            Tutup
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            variant="outline"
                                            isLoading={loading}
                                        >
                                            Simpan
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </main>
                    <footer className="px-5 pb-5">
                        <p className="text-center text-gray-500">
                            &copy; 2025 DPRD Lampung. All rights reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </AuthProvider>
    );
}
