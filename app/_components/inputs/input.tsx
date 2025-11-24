"use client";

//
interface InputProps {
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
    error?: string;
    onInput?: React.InputHTMLAttributes<HTMLInputElement>["onInput"];
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
    autoFocus?: React.InputHTMLAttributes<HTMLInputElement>["autoFocus"];
    className?: React.InputHTMLAttributes<HTMLInputElement>["className"];
    placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
}

//
export default function Input({
    type = "text",
    name,
    error,
    onInput,
    onChange,
    autoFocus,
    className = "",
    placeholder = "Masukkan input",
}: InputProps) {
    return (
        <input
            type={type}
            name={name}
            onInput={onInput}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className={`${
                error ? "border-red-300" : "border-gray-300"
            } ${className} w-full px-3 py-2 rounded-lg border-2 text-gray-600 transition-all`}
        />
    );
}
