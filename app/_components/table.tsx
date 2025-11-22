"use client";

//
interface TableProps<T> {
    data: T[] | object | undefined | null;
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

//
export default function Table<T>({
    data,
    columns,
    isLoading,
    emptyMessage = "Tidak ada data",
}: TableProps<T>) {
    let content: React.ReactNode = (
        <tr>
            <td
                colSpan={columns.length}
                className="px-4 py-3 text-red-500 text-center"
            >
                Tidak dapat memuat data
            </td>
        </tr>
    );

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-10 mb-4 bg-gray-200 rounded"></div>
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="h-16 mb-2 bg-gray-100 rounded"
                    ></div>
                ))}
            </div>
        );
    }

    if (Array.isArray(data)) {
        if (data.length) {
            content = data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td
                            key={colIndex}
                            className={`${
                                column?.className ?? "text-center"
                            } px-4 py-3 text-gray-500`}
                        >
                            {typeof column.accessor === "function"
                                ? column.accessor(item)
                                : item[column.accessor] &&
                                  String(item[column.accessor])}
                        </td>
                    ))}
                </tr>
            ));
        } else {
            content = (
                <tr>
                    <td
                        colSpan={columns.length}
                        className="px-4 py-3 text-gray-500 text-center"
                    >
                        {emptyMessage}
                    </td>
                </tr>
            );
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="max-w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-gray-100 bg-gray-50">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="px-5 py-3 font-medium text-gray-500"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {content}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
