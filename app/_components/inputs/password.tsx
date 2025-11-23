"use client";

import Input from "./input";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

//
interface PasswordProps {
    error?: string;
    onInput?: React.InputHTMLAttributes<HTMLInputElement>["onInput"];
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

//
export default function Password({ error, onInput, onChange }: PasswordProps) {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="relative">
            <Input
                error={error}
                type={visible ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                className="pr-10"
                onInput={onInput}
                onChange={onChange}
            />
            <button
                type="button"
                className={`${
                    error ? "text-red-500" : ""
                } absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all`}
                onClick={() => setVisible((prev) => !prev)}
            >
                {visible ? (
                    <VisibilityOutlined fontSize="small" />
                ) : (
                    <VisibilityOffOutlined fontSize="small" />
                )}
            </button>
        </div>
    );
}
