"use client";

import DefaultLink from "next/link";
import { AutorenewOutlined } from "@mui/icons-material";

//
type LinkSize = "xs" | "sm" | "md";

type LinkVariant = "primary" | "outline" | "danger";

type LinkRounded = "base" | "full";

interface LinkProps {
    href: string;
    children: React.ReactNode;
    size?: LinkSize;
    endIcon?: React.ReactNode;
    rounded?: LinkRounded;
    variant?: LinkVariant;
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
    primary: "bg-primary hover:bg-primary/90 text-white",
    outline:
        "bg-white hover:bg-gray-50 ring-2 ring-inset ring-primary text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
};

const roundedClasses = {
    base: "rounded-xl",
    full: "rounded-4xl",
};

//
export default function Link({
    href,
    children,
    size = "md",
    endIcon,
    rounded = "base",
    variant = "primary",
    className = "",
    isLoading = false,
    startIcon,
}: LinkProps) {
    return (
        <DefaultLink
            href={href}
            className={`${className} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} rounded-lg flex items-center justify-center gap-0.5 transition-all`}
        >
            {!isLoading && startIcon && startIcon}
            {isLoading && <AutorenewOutlined className="animate-spin" />}
            {children}
            {!isLoading && endIcon && endIcon}
        </DefaultLink>
    );
}
