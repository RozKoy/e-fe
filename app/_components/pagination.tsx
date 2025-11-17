"use client";

import Button from "./button";
import Lineicons from "@lineiconshq/react-lineicons";
import { ChevronLeftOutlined } from "@lineiconshq/free-icons";

//
interface PaginationProps {
    next: () => void;
    previous: () => void;
    page?: number;
    totalPages?: number;
    nextDisabled?: boolean;
    previousDisabled?: boolean;
}

//
export default function Pagination({
    next,
    previous,
    page,
    totalPages,
    nextDisabled,
    previousDisabled,
}: PaginationProps) {
    const check = (value: number, page: number, totalPages: number) => {
        return (
            value <= 2 ||
            value >= totalPages - 1 ||
            (page - 1 <= value && value <= page + 1)
        );
    };

    const pageArr = Array.from(
        { length: totalPages ?? 0 },
        (_, index) => index + 1
    ).filter((value) => check(value, page ?? 0, totalPages ?? 0));

    return (
        <div className="flex justify-end gap-2.5 *:w-min">
            <Button
                size="xs"
                variant="outline"
                onClick={previous}
                disabled={previousDisabled}
            >
                <Lineicons icon={ChevronLeftOutlined} className="w-4" />
            </Button>
            {page &&
                totalPages &&
                pageArr.map((value) => (
                    <Button key={value} size="xs" variant="outline">
                        {(value === 2 && page - 1 > value) ||
                        (value === totalPages - 1 && value > page + 1)
                            ? "..."
                            : value}
                    </Button>
                ))}
            <Button
                size="xs"
                variant="outline"
                onClick={next}
                disabled={nextDisabled}
            >
                <Lineicons
                    icon={ChevronLeftOutlined}
                    className="w-4 rotate-180"
                />
            </Button>
        </div>
    );
}
