"use client";

import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";

//
interface SelectProps {
    error?: string;
    children?: React.ReactNode;
    placeholder?: string;
}

//
export default function Select({
    error,
    children,
    placeholder = "Silahkan pilih",
}: SelectProps) {
    return (
        <div className="relative w-full">
            <select
                defaultValue={""}
                className={`${
                    error ? "border-red-300" : "border-gray-300"
                } peer w-full px-3 py-2 rounded-lg border-2 text-gray-600 appearance-none`}
            >
                {placeholder && (
                    <option value={""} disabled>
                        {placeholder}
                    </option>
                )}
                {children && children}
            </select>
            <ExpandMoreOutlined className="peer-open:hidden absolute top-1/2 right-0 -translate-1/2 transition-all" />
            <ExpandLessOutlined className="hidden peer-open:block absolute top-1/2 right-0 -translate-1/2 transition-all" />
        </div>
    );
}
