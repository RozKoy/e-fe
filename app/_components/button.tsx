"use client";

import Lineicons from "@lineiconshq/react-lineicons";
import { Spinner2SacleOutlined } from "@lineiconshq/free-icons";

//
interface ButtonProps {
    children: React.ReactNode;
    size?: "xs" | "sm" | "md";
    type?: "button" | "submit" | "reset" | undefined;
    endIcon?: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "outline" | "danger";
    disabled?: boolean;
    className?: string;
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
            {startIcon && startIcon}
            {isLoading ? (
                <div className="flex gap-0.5 items-center justify-center">
                    <Lineicons
                        icon={Spinner2SacleOutlined}
                        className="animate-spin"
                    />
                    Loading...
                </div>
            ) : (
                children
            )}
            {endIcon && endIcon}
        </button>
    );
}
