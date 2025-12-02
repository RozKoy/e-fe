"use client";

//
interface TextareaProps {
    name?: React.InputHTMLAttributes<HTMLTextAreaElement>["name"];
    error?: string;
    value?: React.InputHTMLAttributes<HTMLTextAreaElement>["value"];
    onInput?: React.InputHTMLAttributes<HTMLTextAreaElement>["onInput"];
    onChange?: React.InputHTMLAttributes<HTMLTextAreaElement>["onChange"];
    disabled?: React.InputHTMLAttributes<HTMLTextAreaElement>["disabled"];
    autoFocus?: React.InputHTMLAttributes<HTMLTextAreaElement>["autoFocus"];
    className?: React.InputHTMLAttributes<HTMLTextAreaElement>["className"];
    placeholder?: React.InputHTMLAttributes<HTMLTextAreaElement>["placeholder"];
    defaultValue?: React.InputHTMLAttributes<HTMLTextAreaElement>["defaultValue"];
}

//
export default function Textarea({
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
}: TextareaProps) {
    return (
        <textarea
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
            } ${className} w-full px-3 py-2 rounded-lg border-2 bg-white disabled:bg-gray-50 focus:outline-primary text-gray-600 disabled:cursor-not-allowed transition-all`}
        ></textarea>
    );
}
