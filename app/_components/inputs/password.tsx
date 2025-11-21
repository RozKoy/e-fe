"use client";

import Input from "./input";
import Lineicons from "@lineiconshq/react-lineicons";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { EyeOutlined, LineDashedOutlined } from "@lineiconshq/free-icons";

//
interface PasswordProps {
    name?: string;
    error?: string;
    onInput?: FormEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

//
export default function Password({
    name,
    error,
    onInput,
    onChange,
}: PasswordProps) {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="relative">
            <Input
                name={name}
                error={error}
                type={visible ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                className="pr-8"
                onInput={onInput}
                onChange={onChange}
            />
            <button
                type="button"
                className={`${
                    error ? "text-red-500" : ""
                } absolute right-1.5 top-1/2 -translate-y-1/2 transition-all`}
                onClick={() => setVisible((prev) => !prev)}
            >
                <Lineicons icon={EyeOutlined} />
                {!visible && (
                    <Lineicons
                        icon={LineDashedOutlined}
                        className="absolute left-0 top-0 right-0 bottom-0 rotate-45 transition-all"
                    />
                )}
            </button>
        </div>
    );
}
