"use client";

//
interface InputProps {
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
    name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
    error?: string;
    value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
    onInput?: React.InputHTMLAttributes<HTMLInputElement>["onInput"];
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
    disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
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
    value,
    onInput,
    onChange,
    disabled,
    autoFocus,
    className = "",
    placeholder = "Masukkan input",
    defaultValue,
}: InputProps) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onInput={onInput}
            onChange={onChange}
            disabled={disabled}
            autoFocus={autoFocus}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`${
                error ? "border-red-400" : "border-primary/80"
            } ${className} w-full px-3 py-2 rounded-4xl border-2 bg-white disabled:bg-gray-50 focus:outline-primary text-gray-600 disabled:cursor-not-allowed transition-all`}
        />
    );
}
