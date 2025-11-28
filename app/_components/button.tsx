"use client";

import { AutorenewOutlined } from "@mui/icons-material";

//
type ButtonSize = "xs" | "sm" | "md";

type ButtonVariant = "primary" | "outline" | "danger";

type ButtonRounded = "base" | "full";

interface ButtonProps {
    children: React.ReactNode;
    size?: ButtonSize;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    endIcon?: React.ReactNode;
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    rounded?: ButtonRounded;
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
    primary: "bg-primary hover:bg-primary/90 text-white",
    outline:
        "bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
};

const roundedClasses = {
    base: "rounded-xl",
    full: "rounded-4xl",
};

//
export default function Button({
    children,
    size = "md",
    type = "button",
    endIcon,
    onClick,
    rounded = "base",
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
                roundedClasses[rounded]
            } ${variantClasses[variant]} ${
                disabled && "opacity-50"
            } inline-flex items-center justify-center gap-0.5 cursor-pointer disabled:cursor-not-allowed transition`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {!isLoading && startIcon && startIcon}
            {isLoading && (
                <AutorenewOutlined className="animate-spin" fontSize="small" />
            )}
            {children}
            {!isLoading && endIcon && endIcon}
        </button>
    );
}
