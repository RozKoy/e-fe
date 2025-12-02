"use client";

import {
    // AddOutlined,
    MapOutlined,
    // EditOutlined,
    // DeleteOutline,
} from "@mui/icons-material";
import useSWR from "swr";
// import DefaultLink from "next/link";
// import Link from "@/app/_components/link";
import { IArea } from "@/app/_types/area";
import { IResponse } from "@/app/_types/api";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
// import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Area",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseAreaPage() {
    const alert = useAlert();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    // const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

    // const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataArea,
        error: errorArea,
        // mutate: mutateArea,
        isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(
        `${ROUTE_LISTS.get("api-area-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const columns: Column<IArea>[] = [
        { header: "Nama", accessor: "name" },
        // {
        //     header: "Aksi",
        //     accessor: (item: IArea) => (
        //         <div className="flex items-center justify-center">
        //             <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
        //                 <DefaultLink
        //                     href={
        //                         ROUTE_LISTS.get("area-edit")?.replace(
        //                             ":id",
        //                             item.id
        //                         ) ?? "#"
        //                     }
        //                 >
        //                     <EditOutlined />
        //                 </DefaultLink>
        //             </div>
        //             <button
        //                 className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer transition-all"
        //                 onClick={() => {
        //                     handleDeleteItem(item);
        //                 }}
        //             >
        //                 <DeleteOutline />
        //             </button>
        //         </div>
        //     ),
        // },
    ];

    // const handleDeleteClose = () => {
    //     setSelectedArea(null);
    //     setDeleteModal(false);
    // };

    // const handleDeleteItem = (item: IArea) => {
    //     setSelectedArea(item);
    //     setDeleteModal(true);
    // };

    // const handleDelete = async () => {
    //     let url = ROUTE_LISTS.get("api-area-delete");

    //     if (!url || !selectedArea?.id) {
    //         alert.addAlert({
    //             type: "error",
    //             message: "Mohon maaf, sistem sedang bermasalah",
    //         });

    //         return;
    //     }

    //     setIsLoading(true);

    //     url = url.replace(":id", selectedArea.id);

    //     const res = await fetch(url, { method: "DELETE" });

    //     if (res.ok) {
    //         alert.addAlert({
    //             type: "success",
    //             message: "Berhasil menghapus data",
    //         });
    //         await mutateArea();
    //     } else {
    //         alert.addAlert({
    //             type: "error",
    //             message: "Gagal menghapus data",
    //         });
    //     }

    //     setIsLoading(false);
    //     setDeleteModal(false);
    //     setSelectedArea(null);
    // };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingArea &&
                ((!dataArea && errorArea) ||
                    (dataArea && !Array.isArray(dataArea?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorArea?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataArea, errorArea, isLoadingArea]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <MapOutlined />
                    <h2>Manajemen Area</h2>
                </div>
                {/* <Link
                    href={ROUTE_LISTS.get("area-add") ?? "#"}
                    size="sm"
                    variant="primary"
                    startIcon={<AddOutlined fontSize="small" />}
                    className="ml-auto"
                >
                    Tambah
                </Link> */}
            </div>
            <Table
                data={dataArea?.data}
                columns={columns}
                isLoading={isLoadingArea}
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
                    totalPages={dataArea?.totalPage || 1}
                />
            </div>
            {/* <DeleteModal
                show={deleteModal}
                onClose={handleDeleteClose}
                onConfirm={handleDelete}
                isLoading={isLoading}
            /> */}
        </>
    );
}
