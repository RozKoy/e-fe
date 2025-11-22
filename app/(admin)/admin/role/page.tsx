"use client";

import useSWR from "swr";
import Link from "@/app/_components/link";
import { IRole } from "@/app/_types/role";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Lineicons from "@lineiconshq/react-lineicons";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import { PlusOutlined, Shield2Outlined } from "@lineiconshq/free-icons";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Peran",
    },
];

const columns: Column<IRole>[] = [
    { header: "Name", accessor: "name" },
    { header: "Deskripsi", accessor: "description" },
];

//
export default function BaseRolePage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    const {
        data: dataRole,
        error: errorRole,
        isLoading: isLoadingRole,
    } = useSWR<IResponse<IRole[]>>(
        `${ROUTE_LISTS.get("api-role-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingRole &&
                ((!dataRole && errorRole) ||
                    (dataRole && !Array.isArray(dataRole?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorRole?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataRole, errorRole, isLoadingRole]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <Lineicons icon={Shield2Outlined} />
                    <h2>Manajemen Peran</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("role-add") ?? "#"}
                    size="sm"
                    variant="outline"
                    startIcon={
                        <Lineicons icon={PlusOutlined} className="w-5" />
                    }
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table
                data={dataRole?.data}
                columns={columns}
                isLoading={isLoadingRole}
            />
            <Pagination
                page={page}
                setPage={setPage}
                totalPages={dataRole?.totalPage ?? 1}
            />
        </>
    );
}
