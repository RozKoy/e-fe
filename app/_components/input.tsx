import { HTMLInputTypeAttribute } from "react";

interface InputProps {
    type?: HTMLInputTypeAttribute;
    error?: string;
    placeholder?: string;
}

export default function Input({
    type = "text",
    error,
    placeholder = "Masukkan input",
}: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`${
                error ? "border-red-300" : "border-gray-300"
            } w-full px-3 py-2 rounded-lg border-2 text-gray-600`}
        />
    );
}
