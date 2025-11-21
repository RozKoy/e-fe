import {
    FormEventHandler,
    ChangeEventHandler,
    HTMLInputTypeAttribute,
} from "react";

//
interface InputProps {
    name?: string;
    type?: HTMLInputTypeAttribute;
    error?: string;
    onInput?: FormEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    placeholder?: string;
}

//
export default function Input({
    name,
    type = "text",
    error,
    onInput,
    onChange,
    className = "",
    placeholder = "Masukkan input",
}: InputProps) {
    return (
        <input
            name={name}
            type={type}
            onInput={onInput}
            onChange={onChange}
            placeholder={placeholder}
            className={`${
                error ? "border-red-300" : "border-gray-300"
            } ${className} w-full px-3 py-2 rounded-lg border-2 text-gray-600 transition-all`}
        />
    );
}
