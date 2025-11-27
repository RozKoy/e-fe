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
    defaultValue?: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
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
    defaultValue,
}: InputProps) {
    return (
        <input
            type={type}
            name={name}
            onInput={onInput}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${
                error ? "border-red-400" : "border-white"
            } ${className} w-full px-3 py-2 rounded-4xl border-2 bg-white focus:outline-primary text-gray-600 transition-all`}
        />
    );
}
