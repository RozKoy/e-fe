"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import { postRequest } from "@/app/_utils/api";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Password from "@/app/_components/inputs/password";
import { useAlert } from "@/app/_providers/AlertProvider";

//
export default function LoginPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginUrl = ROUTE_LISTS.get("login");
        const logoutUrl = ROUTE_LISTS.get("local-logout");
        const profileUrl = ROUTE_LISTS.get("api-profile-get");

        if (!loginUrl || !logoutUrl || !profileUrl) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        await postRequest({
            body: { email, password },
            alert,
            setErrors,
            setLoading,
            setErrorMessage,
            route: "local-login",
            errorMessage: "Gagal masuk, silahkan coba kembali",
            successMessage: "Berhasil masuk",
            successAction: async () => {
                const res = await fetch(profileUrl);

                const response = await res.json();

                if (res.ok) {
                    setTimeout(() => {
                        router.push(
                            response?.data?.role
                                ? ROUTE_LISTS.get("dashboard") ?? "/"
                                : "/"
                        );
                        alert.addAlert({
                            type: "success",
                            message: "Selamat Datang :)",
                        });
                    }, 500);
                } else {
                    await fetch(logoutUrl);

                    alert.addAlert({
                        type: "error",
                        message: "Mohon maaf, sistem sedang bermasalah",
                    });

                    setLoading(false);
                }
            },
        });
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex">
            <div className="hidden lg:block flex-1"></div>
            <div className="flex-1 bg-primary"></div>
            <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full max-w-400 grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:flex p-10 flex-col gap-4 justify-center">
                    <div className="flex items-center justify-start">
                        <div className="relative w-24 aspect-square">
                            <Image
                                src="/images/lampung-logo.png"
                                alt="logo"
                                style={{ objectFit: "contain" }}
                                fill
                            />
                        </div>
                        <div className="relative w-24 aspect-square">
                            <Image
                                src="/images/app-logo.png"
                                alt="logo"
                                style={{ objectFit: "cover" }}
                                fill
                            />
                        </div>
                    </div>
                    <h1 className="font-extrabold leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-primary">
                        <span className="text-secondary tracking-wider">
                            SELAMAT DATANG DI
                        </span>{" "}
                        SISTEM INFORMASI MANAJEMEN RESES DPRD LAMPUNG
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
                <div className="bg-primary flex items-center justify-center">
                    <div className="max-w-2xl p-6 md:p-10 rounded-lg flex flex-col gap-6 text-white">
                        <div className="block lg:hidden relative w-32 aspect-square rounded-full mx-auto bg-white">
                            <Image
                                src="/images/app-logo.png"
                                alt="logo"
                                style={{ objectFit: "contain" }}
                                fill
                            />
                        </div>
                        <h1 className="font-medium tracking-wide text-2xl md:text-3xl text-center md:text-start">
                            Selamat Datang di{" "}
                            <span className="font-bold text-secondary">
                                SIMRESES
                            </span>{" "}
                            DPRD Provinsi Lampung
                        </h1>
                        <form
                            onSubmit={login}
                            className="flex flex-col gap-3 font-semibold"
                        >
                            <Label
                                text="Email"
                                error={errors?.get("email")}
                                required
                            >
                                <Input
                                    error={errors?.get("email")}
                                    autoFocus={true}
                                    placeholder="Masukkan email"
                                    onInput={() =>
                                        setErrors((prev) => {
                                            prev?.delete("email");
                                            return prev;
                                        })
                                    }
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Label>
                            <Label
                                text="Kata Sandi"
                                error={errors?.get("password")}
                                required
                            >
                                <Password
                                    error={errors?.get("password")}
                                    onInput={() =>
                                        setErrors((prev) => {
                                            prev?.delete("password");
                                            return prev;
                                        })
                                    }
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Label>
                            <p className="text-red-500 text-center">
                                {errorMessage && errorMessage}
                            </p>
                            <Button
                                type="submit"
                                rounded="full"
                                variant="outline"
                                isLoading={loading}
                                className="font-bold text-primary"
                            >
                                Masuk
                            </Button>
                        </form>
                        <p className="font-medium text-right text-sm">
                            Belum punya akun?{" "}
                            <Link
                                href={ROUTE_LISTS.get("register") ?? "/"}
                                className="text-secondary underline hover:opacity-75 transition-all"
                            >
                                Daftar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
