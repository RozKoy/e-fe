"use client";

import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";

//
interface SelectProps {
    name?: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
    value?: React.SelectHTMLAttributes<HTMLSelectElement>["value"];
    error?: string;
    children?: React.ReactNode;
    onChange?: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
    placeholder?: string;
    defaultValue?: React.SelectHTMLAttributes<HTMLSelectElement>["defaultValue"];
}

//
export default function Select({
    name,
    value,
    error,
    children,
    onChange,
    placeholder,
    defaultValue,
}: SelectProps) {
    return (
        <div className="relative w-full transition-all">
            <select
                name={name}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                className={`${
                    error ? "border-red-300" : "border-gray-300"
                } peer w-full pl-3 py-2 pr-8 rounded-lg border-2 text-gray-600 appearance-none`}
            >
                {placeholder && (
                    <option value={""} disabled>
                        {placeholder}
                    </option>
                )}
                {children && children}
            </select>
            <div className="peer-open:hidden absolute top-1/2 right-1 -translate-y-1/2 transition-all">
                <ExpandMoreOutlined />
            </div>
            <div className="hidden peer-open:block absolute top-1/2 right-1 -translate-y-1/2 transition-all">
                <ExpandLessOutlined />
            </div>
        </div>
    );
}
