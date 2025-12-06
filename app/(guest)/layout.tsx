"use client";

import useSWR from "swr";
import { IUser } from "../_types/user";
import Label from "../_components/label";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { IResponse } from "../_types/api";
import Button from "../_components/button";
import { useEffect, useState } from "react";
import File from "../_components/inputs/file";
import Input from "../_components/inputs/input";
import Select from "../_components/inputs/select";
import { ROUTE_LISTS } from "../_constants/route";
import { CloseOutlined } from "@mui/icons-material";
import { useUser } from "../_providers/UserProvider";
import { useAlert } from "../_providers/AlertProvider";
import { badRequestResponseFormat } from "../_utils/api";

//
interface GuestLayoutProps {
    children: React.ReactNode;
}

//
const links = [
    {
        name: "Beranda",
        href: "/",
    },
    {
        name: "Usulan",
        href: ROUTE_LISTS.get("public-proposal") ?? "/",
    },
    {
        name: "Anggota DPRD",
        href: ROUTE_LISTS.get("public-member") ?? "/",
    },
    {
        name: "Berita",
        href: ROUTE_LISTS.get("public-article") ?? "/",
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
export default function GuestLayout({ children }: GuestLayoutProps) {
    const alert = useAlert();
    const { setUser } = useUser();

    const [showProfile, setShowProfile] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const {
        data: dataProfile,
        // error: errorProfile,
        mutate: mutateProfile,
        isLoading: isLoadingProfile,
    } = useSWR<IResponse<IUser>>(`${ROUTE_LISTS.get("api-profile-get")}`);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("api-profile-update");

        if (!url) {
            setLoading(false);

            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

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

    useEffect(() => {
        setUser(dataProfile?.data ?? null);
    }, [setUser, dataProfile?.data]);

    return (
        <>
            <Navbar
                links={links}
                user={dataProfile?.data}
                loading={isLoadingProfile}
                setShowProfile={setShowProfile}
            />
            {children}
            <Footer links={links} />
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
                                        dataProfile?.data?.profile?.name ?? ""
                                    }
                                    onInput={() =>
                                        setErrors((prev) => {
                                            prev?.delete("name");
                                            return prev?.size ? prev : null;
                                        })
                                    }
                                />
                            </Label>
                            <Label
                                text="Nomor HP"
                                error={errors?.get("phoneNumber")}
                            >
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    error={errors?.get("phoneNumber")}
                                    placeholder="Masukkan nomor hp"
                                    defaultValue={
                                        dataProfile?.data?.profile
                                            ?.phoneNumber ?? ""
                                    }
                                    onInput={() =>
                                        setErrors((prev) => {
                                            prev?.delete("phoneNumber");
                                            return prev?.size ? prev : null;
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
                                        dataProfile?.data?.profile?.gender ?? ""
                                    }
                                    onChange={() => {
                                        setErrors((prev) => {
                                            prev?.delete("gender");
                                            return prev?.size ? prev : null;
                                        });
                                    }}
                                >
                                    {genderOptions.map((item, index) => (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                            <Label text="Umur" error={errors?.get("age")}>
                                <Input
                                    type="number"
                                    name="age"
                                    error={errors?.get("age")}
                                    placeholder="Masukkan umur"
                                    defaultValue={
                                        dataProfile?.data?.profile?.age ?? ""
                                    }
                                    onInput={() =>
                                        setErrors((prev) => {
                                            prev?.delete("age");
                                            return prev?.size ? prev : null;
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
                                                prev?.delete("image");
                                                return prev?.size ? prev : null;
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
                                onClick={() => setShowProfile(false)}
                            >
                                Tutup
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                isLoading={loading}
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
