"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Password from "@/app/_components/inputs/password";
import { useAlert } from "@/app/_providers/AlertProvider";
import { badRequestResponseFormat } from "@/app/_utils/api";

export default function LoginPage() {
    const alert = useAlert();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const login = async () => {
        setLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("local-login");

        if (!url) {
            setLoading(false);
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });
            return;
        }

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const response = await res.json();

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil masuk",
            });

            setTimeout(() => {
                router.push(ROUTE_LISTS.get("dashboard") ?? "/");
                alert.addAlert({
                    type: "success",
                    message: "Selamat Datang :)",
                });
            }, 1500);
        } else {
            if (Array.isArray(response.message)) {
                setErrors(badRequestResponseFormat(response.message));
            } else {
                setErrorMessage(response.message);

                alert.addAlert({
                    type: "error",
                    message: "Gagal masuk, silahkan coba kembali",
                });
            }

            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-11/12 md:w-xl p-10 rounded-lg bg-white flex flex-col gap-6 shadow">
                <h1 className="md:text-center">
                    Selamat Datang di SIMRESES DPRD Provinsi Lampung
                </h1>
                <form
                    method="POST"
                    action="/be/auth/login"
                    className="flex flex-col gap-3"
                >
                    <Label text="Email" error={errors?.get("email")} required>
                        <Input
                            name="email"
                            error={errors?.get("email")}
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
                            name="password"
                            error={errors?.get("password")}
                            onInput={() =>
                                setErrors((prev) => {
                                    prev?.delete("password");
                                    return prev;
                                })
                            }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Label>
                    <p className="text-red-500 text-center">
                        {errorMessage && errorMessage}
                    </p>
                    <Button
                        variant="outline"
                        onClick={login}
                        isLoading={loading}
                    >
                        Masuk
                    </Button>
                </form>
            </div>
        </div>
    );
}
