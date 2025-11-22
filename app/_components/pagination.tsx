"use client";

import Button from "./button";
import Lineicons from "@lineiconshq/react-lineicons";
import { ChevronLeftOutlined } from "@lineiconshq/free-icons";

//
interface PaginationProps {
    page?: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    totalPages?: number;
}

//
export default function Pagination({
    page,
    setPage,
    totalPages,
}: PaginationProps) {
    const check = (value: number) => {
        return (
            page &&
            totalPages &&
            (value <= 2 ||
                value >= totalPages - 1 ||
                (page - 1 <= value && value <= page + 1))
        );
    };

    const itemCheck = (value: number) => {
        return (
            page &&
            totalPages &&
            ((value === 2 && page - 1 > value) ||
                (value === totalPages - 1 && value > page + 1))
        );
    };

    const pageArr = Array.from(
        { length: totalPages ?? 0 },
        (_, index) => index + 1
    ).filter((value) => check(value));

    return (
        <div className="flex justify-end gap-2.5 *:w-min">
            <Button
                size="xs"
                variant="outline"
                onClick={() => {
                    if (setPage) {
                        setPage((prev) => prev - 1);
                    }
                }}
                disabled={!page || page <= 1}
            >
                <Lineicons icon={ChevronLeftOutlined} className="w-4" />
            </Button>
            {page &&
                totalPages &&
                pageArr.map((value) => (
                    <Button
                        key={value}
                        size="xs"
                        variant="outline"
                        onClick={() => {
                            if (!itemCheck && setPage) {
                                setPage(value);
                            }
                        }}
                        disabled={!page || page === value}
                    >
                        {itemCheck(value) ? "..." : value}
                    </Button>
                ))}
            <Button
                size="xs"
                variant="outline"
                onClick={() => {
                    if (setPage) {
                        setPage((prev) => prev + 1);
                    }
                }}
                disabled={!page || !totalPages || page >= totalPages}
            >
                <Lineicons
                    icon={ChevronLeftOutlined}
                    className="w-4 rotate-180"
                />
            </Button>
        </div>
    );
}
