"use client";

import {
    AddOutlined,
    WorkOutline,
    EditOutlined,
    DeleteOutline,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { IPosition } from "@/app/_types/position";
import Input from "@/app/_components/inputs/input";
import { useEffect, useRef, useState } from "react";
import { permissionCheck } from "@/app/_utils/auth";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { ICommission } from "@/app/_types/commission";
import Table, { Column } from "@/app/_components/table";
import { useUser } from "@/app/_providers/UserProvider";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Posisi",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

const levelOptions = [
    {
        value: "ketua",
        label: "Ketua",
    },
    {
        value: "wakil",
        label: "Wakil",
    },
    {
        value: "sekretaris",
        label: "Sekretaris",
    },
    {
        value: "anggota",
        label: "Anggota",
    },
];

const categoryOptions = [
    {
        value: "pimpinan",
        label: "Pimpinan",
    },
    {
        value: "komisi",
        label: "Komisi",
    },
];

//
export default function BasePositionPage() {
    const alert = useAlert();
    const router = useRouter();
    const { user } = useUser();
    const { setRootLoading } = useLoading();

    const hasError = useRef<boolean>(false);

    const searchRef = useRef<string>("");

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [showFilter, setShowFilter] = useState<boolean>(false);

    const [level, setLevel] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [commissionId, setCommissionId] = useState<string>("");

    const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(
        null
    );

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataPosition,
        error: errorPosition,
        mutate: mutatePosition,
        isLoading: isLoadingPosition,
    } = useSWR<IResponse<IPosition[]>>(
        `${ROUTE_LISTS.get("api-position-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            level,
            search,
            category,
            commissionId,
        })}`
    );

    const {
        data: dataCommission,
        // error: errorCommission,
        // mutate: mutateCommission,
        // isLoading: isLoadingCommission,
    } = useSWR<IResponse<ICommission[]>>(
        `${ROUTE_LISTS.get("api-commission-get")}`
    );

    const columns: Column<IPosition>[] = [
        { header: "Nama", accessor: "name", className: "text-left" },
        {
            header: "Grup",
            accessor: (item: IPosition) => item?.category?.toUpperCase() ?? "-",
        },
        {
            header: "Tingkat",
            accessor: (item: IPosition) => item?.level?.toUpperCase() ?? "-",
        },
        {
            header: "Komisi",
            accessor: (item: IPosition) => item?.commission?.name ?? "-",
        },
        ...(permissionCheck(user, ["Ubah Posisi", "Hapus Posisi"])
            ? [
                  {
                      header: "Aksi",
                      accessor: (item: IPosition) => (
                          <div className="flex items-center justify-center">
                              {permissionCheck(user, "Ubah Posisi") && (
                                  <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                                      <DefaultLink
                                          href={
                                              ROUTE_LISTS.get(
                                                  "position-edit"
                                              )?.replace(":id", item.id) ?? "#"
                                          }
                                      >
                                          <EditOutlined />
                                      </DefaultLink>
                                  </div>
                              )}
                              {permissionCheck(user, "Hapus Posisi") && (
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
        setSelectedPosition(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IPosition) => {
        setSelectedPosition(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-position-delete");

        if (!url || !selectedPosition?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedPosition.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutatePosition();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedPosition(null);
    };

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (
                !permissionCheck(user, [
                    "Lihat Posisi",
                    "Buat Posisi",
                    "Ubah Posisi",
                    "Hapus Posisi",
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
                !isLoadingPosition &&
                ((!dataPosition && errorPosition) ||
                    (dataPosition && !Array.isArray(dataPosition?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorPosition?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataPosition, errorPosition, isLoadingPosition]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <WorkOutline />
                    <h2>Manajemen Posisi</h2>
                </div>
                {permissionCheck(user, "Buat Posisi") && (
                    <Link
                        href={ROUTE_LISTS.get("position-add") ?? "#"}
                        size="sm"
                        variant="primary"
                        startIcon={<AddOutlined fontSize="small" />}
                        className="ml-auto"
                    >
                        Tambah
                    </Link>
                )}
            </div>
            <div className="relative z-40 flex justify-between">
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
                <Button
                    rounded="full"
                    startIcon={
                        <FilterListIcon
                            className="h-4 w-4 mr-2"
                            style={{ fontSize: "18px" }}
                        />
                    }
                    onClick={() => setShowFilter((prev) => !prev)}
                >
                    Filter
                </Button>
                {showFilter && (
                    <div className="absolute right-0 top-[120%] min-w-72 max-w-96 p-4 rounded-xl bg-white border-2 border-gray-100 shadow space-y-3">
                        <Select
                            placeholder="Semua Grup"
                            firstOption={true}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categoryOptions.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Semua Tingkat"
                            firstOption={true}
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            {levelOptions.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Semua Komisi"
                            firstOption={true}
                            value={commissionId}
                            onChange={(e) => setCommissionId(e.target.value)}
                        >
                            {dataCommission?.data?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                )}
            </div>
            <Table
                data={dataPosition?.data}
                columns={columns}
                isLoading={isLoadingPosition}
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
                    totalPages={dataPosition?.totalPage || 1}
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
