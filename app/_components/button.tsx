"use client";

import { CachedOutlined } from "@mui/icons-material";

//
type ButtonSize = "xs" | "sm" | "md";

type ButtonVariant = "primary" | "outline" | "danger";

interface ButtonProps {
    children: React.ReactNode;
    size?: ButtonSize;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    endIcon?: React.ReactNode;
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    variant?: ButtonVariant;
    disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
    className?: React.ButtonHTMLAttributes<HTMLButtonElement>["className"];
    isLoading?: boolean;
    startIcon?: React.ReactNode;
}

//
const sizeClasses = {
    xs: "px-3 py-1.5 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3.5 text-sm",
};

const variantClasses = {
    primary: "",
    outline:
        "bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 text-gray-700",
    danger: "",
};

//
export default function Button({
    children,
    size = "md",
    type = "button",
    endIcon,
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
    isLoading = false,
    startIcon,
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`${className} ${sizeClasses[size]} ${
                variantClasses[variant]
            } ${
                disabled && "opacity-50"
            } rounded-lg inline-flex items-center justify-center gap-0.5 disabled:cursor-not-allowed transition`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {!isLoading && startIcon && startIcon}
            {isLoading && (
                <CachedOutlined className="animate-spin" fontSize="small" />
            )}
            {children}
            {!isLoading && endIcon && endIcon}
        </button>
    );
}
