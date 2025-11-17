"use client";

import DefaultLink from "next/link";
import Lineicons from "@lineiconshq/react-lineicons";
import { Spinner2SacleOutlined } from "@lineiconshq/free-icons";

//
interface LinkProps {
    href: string;
    children: React.ReactNode;
    size?: "xs" | "sm" | "md";
    endIcon?: React.ReactNode;
    variant?: "primary" | "outline" | "danger";
    className?: string;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
}

//
const sizeClasses = {
    xs: "px-3 py-2 text-xs",
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
export default function Link({
    href,
    children,
    size = "md",
    endIcon,
    variant = "primary",
    className = "",
    isLoading = false,
    startIcon,
}: LinkProps) {
    return (
        <DefaultLink
            href={href}
            className={`${className} ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg flex items-center justify-center gap-0.5 transition`}
        >
            {startIcon && startIcon}
            {isLoading ? (
                <div className="flex items-center justify-center">
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
        </DefaultLink>
    );
}
