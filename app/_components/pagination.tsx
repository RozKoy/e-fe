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
    const check = (index: number, page: number, totalPages: number) => {
        return (
            index <= 1 ||
            index >= totalPages - 2 ||
            (page - 2 <= index && index <= page)
        );
    };

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
                Array.from({ length: totalPages }).map((_, index) => (
                    <>
                        {check(index, page, totalPages) && (
                            <>
                                {(index === 1 && page - 2 > index) ||
                                (index === totalPages - 2 && index > page) ? (
                                    <Button size="xs" variant="outline">
                                        ...
                                    </Button>
                                ) : (
                                    <Button size="xs" variant="outline">
                                        {index + 1}
                                    </Button>
                                )}
                            </>
                        )}
                    </>
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
