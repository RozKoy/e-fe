"use client";

import {
    AddOutlined,
    DeleteOutline,
    Diversity2Outlined,
} from "@mui/icons-material";
import useSWR from "swr";
import Image from "next/image";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { IFraction } from "@/app/_types/fraction";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Partai",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseFractionPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedFraction, setSelectedFraction] = useState<IFraction | null>(
        null
    );

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataFraction,
        error: errorFraction,
        mutate: mutateFraction,
        isLoading: isLoadingFraction,
    } = useSWR<IResponse<IFraction[]>>(
        `${ROUTE_LISTS.get("api-fraction-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<IFraction>[] = [
        { header: "Nama", accessor: "name" },
        {
            header: "Gambar",
            accessor: (item: IFraction) => (
                <>
                    {item.imageUrl && (
                        <div className="relative w-full max-w-32 h-auto mx-auto aspect-video">
                            <Image
                                src={`http://${item.imageUrl}`}
                                alt={item.name}
                                style={{ objectFit: "cover" }}
                                fill
                                unoptimized
                            />
                        </div>
                    )}
                </>
            ),
        },
        {
            header: "Aksi",
            accessor: (item: IFraction) => (
                <button
                    className="p-1 rounded-full hover:bg-red-100 text-red-500 cursor-pointer transition-all"
                    onClick={() => {
                        handleDeleteItem(item);
                    }}
                >
                    <DeleteOutline />
                </button>
            ),
        },
    ];

    const handleDeleteClose = () => {
        setSelectedFraction(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IFraction) => {
        setSelectedFraction(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-fraction-delete");

        if (!url || !selectedFraction?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedFraction.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateFraction();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedFraction(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingFraction &&
                ((!dataFraction && errorFraction) ||
                    (dataFraction && !Array.isArray(dataFraction?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorFraction?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataFraction, errorFraction, isLoadingFraction]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <Diversity2Outlined />
                    <h2>Manajemen Partai</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("fraction-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataFraction?.data}
                columns={columns}
                isLoading={isLoadingFraction}
            />
            <div className="flex items-center justify-between">
                <div>
                    <Select
                        value={limit}
                        onChange={(e) => setLimit(parseInt(e.target.value))}
                    >
                        {limitOptions.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </div>
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={dataFraction?.totalPage || 1}
                />
            </div>
            <DeleteModal
                show={deleteModal}
                onClose={handleDeleteClose}
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
        </>
    );
}
