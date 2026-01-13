"use client";

import {
    AddOutlined,
    EditOutlined,
    DeleteOutline,
    Diversity2Outlined,
} from "@mui/icons-material";
import useSWR from "swr";
import Image from "next/image";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import { IFraction } from "@/app/_types/fraction";
import { permissionCheck } from "@/app/_utils/auth";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { useUser } from "@/app/_providers/UserProvider";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import Input from "@/app/_components/inputs/input";
import Button from "@/app/_components/button";

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
    const router = useRouter();
    const { user } = useUser();
    const { setRootLoading } = useLoading();

    const hasError = useRef<boolean>(false);

    const searchRef = useRef<string>("");

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");

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
            search,
        })}`
    );

    const columns: Column<IFraction>[] = [
        { header: "Nama", accessor: "name", className: "text-left" },
        {
            header: "Gambar",
            accessor: (item: IFraction) => (
                <>
                    {item.imageUrl && (
                        <div className="relative max-w-24 max-h-24 m-auto aspect-square">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: "contain" }}
                                unoptimized
                            />
                        </div>
                    )}
                </>
            ),
        },
        ...(permissionCheck(user, ["Ubah Fraksi", "Hapus Fraksi"])
            ? [
                  {
                      header: "Aksi",
                      accessor: (item: IFraction) => (
                          <div className="flex items-center justify-center">
                              {permissionCheck(user, "Ubah Fraksi") && (
                                  <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                                      <DefaultLink
                                          href={
                                              ROUTE_LISTS.get(
                                                  "fraction-edit"
                                              )?.replace(":id", item.id) ?? "#"
                                          }
                                      >
                                          <EditOutlined />
                                      </DefaultLink>
                                  </div>
                              )}
                              {permissionCheck(user, "Hapus Fraksi") && (
                                  <button
                                      className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer transition-all"
                                      onClick={() => {
                                          handleDeleteItem(item);
                                      }}
                                  >
                                      <DeleteOutline />
                                  </button>
                              )}
                          </div>
                      ),
                  },
              ]
            : []),
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
        setRootLoading(true);

        if (user) {
            if (
                !permissionCheck(user, [
                    "Lihat Fraksi",
                    "Buat Fraksi",
                    "Ubah Fraksi",
                    "Hapus Fraksi",
                ])
            ) {
                const timeout = setTimeout(() => {
                    router.push(ROUTE_LISTS.get("dashboard") ?? "/");
                    setRootLoading(false);
                }, 1000);

                return () => clearTimeout(timeout);
            }

            const timeout = setTimeout(() => {
                setRootLoading(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [user, router, setRootLoading]);

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
                {permissionCheck(user, "Buat Fraksi") && (
                    <Link
                        href={ROUTE_LISTS.get("fraction-add") ?? "#"}
                        size="sm"
                        variant="primary"
                        startIcon={<AddOutlined fontSize="small" />}
                        className="ml-auto"
                    >
                        Tambah
                    </Link>
                )}
            </div>
            <div className="flex">
                <div className="w-full lg:w-fit lg:min-w-md flex gap-1">
                    <Input
                        placeholder="Pencarian..."
                        onChange={(e) => {
                            if (!e.target.value) {
                                setSearch("");
                            }
                            searchRef.current = e.target.value;
                        }}
                    />
                    <Button
                        rounded="full"
                        onClick={() => setSearch(searchRef.current)}
                    >
                        Cari
                    </Button>
                </div>
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
                        onChange={(e) => {
                            setPage(1);
                            setLimit(parseInt(e.target.value));
                        }}
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
