"use client";

import {
    AddOutlined,
    EditOutlined,
    DeleteOutline,
    CategoryOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { ICategory } from "@/app/_types/category";
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
        name: "Kategori",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseCategoryPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null
    );

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataCategory,
        error: errorCategory,
        mutate: mutateCategory,
        isLoading: isLoadingCategory,
    } = useSWR<IResponse<ICategory[]>>(
        `${ROUTE_LISTS.get("api-category-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<ICategory>[] = [
        { header: "Nama", accessor: "name" },
        {
            header: "Aksi",
            accessor: (item: ICategory) => (
                <div className="flex items-center justify-center">
                    <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                        <DefaultLink
                            href={
                                ROUTE_LISTS.get("category-edit")?.replace(
                                    ":id",
                                    item.id
                                ) ?? "#"
                            }
                        >
                            <EditOutlined />
                        </DefaultLink>
                    </div>
                    <button
                        className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer transition-all"
                        onClick={() => {
                            handleDeleteItem(item);
                        }}
                    >
                        <DeleteOutline />
                    </button>
                </div>
            ),
        },
    ];

    const handleDeleteClose = () => {
        setSelectedCategory(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: ICategory) => {
        setSelectedCategory(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-category-delete");

        if (!url || !selectedCategory?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedCategory.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateCategory();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedCategory(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingCategory &&
                ((!dataCategory && errorCategory) ||
                    (dataCategory && !Array.isArray(dataCategory?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorCategory?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataCategory, errorCategory, isLoadingCategory]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <CategoryOutlined />
                    <h2>Manajemen Kategori</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("category-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataCategory?.data}
                columns={columns}
                isLoading={isLoadingCategory}
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
                    totalPages={dataCategory?.totalPage || 1}
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
