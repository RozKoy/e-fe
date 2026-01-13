"use client";

import {
    AddOutlined,
    EditOutlined,
    BadgeOutlined,
    DeleteOutline,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import { permissionCheck } from "@/app/_utils/auth";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { IUserAccess } from "@/app/_types/userAccess";
import Table, { Column } from "@/app/_components/table";
import { useUser } from "@/app/_providers/UserProvider";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import Input from "@/app/_components/inputs/input";
import Button from "@/app/_components/button";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IArea } from "@/app/_types/area";
import { IFraction } from "@/app/_types/fraction";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Akses Pengguna",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseUserAccessPage() {
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

    const [areaId, setAreaId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [fractionId, setFractionId] = useState<string>("");

    const [selectedUserAccess, setSelectedUserAccess] =
        useState<IUserAccess | null>(null);

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataUserAccess,
        error: errorUserAccess,
        mutate: mutateUserAccess,
        isLoading: isLoadingUserAccess,
    } = useSWR<IResponse<IUserAccess[]>>(
        `${ROUTE_LISTS.get("api-access-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            search,
            areaId,
            fractionId,
        })}`
    );

    const {
        data: dataArea,
        // error: errorArea,
        // mutate: mutateArea,
        // isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-area-get")}`);

    const {
        data: dataFraction,
        // error: errorFraction,
        // mutate: mutateFraction,
        // isLoading: isLoadingFraction,
    } = useSWR<IResponse<IFraction[]>>(
        `${ROUTE_LISTS.get("api-fraction-get")}`
    );

    const columns: Column<IUserAccess>[] = [
        {
            header: "Email",
            accessor: (item: IUserAccess) => item.user?.email ?? "-",
            className: "text-left",
        },
        {
            header: "Area",
            accessor: (item: IUserAccess) => item.area?.name ?? "-",
            className: "text-left",
        },
        {
            header: "Partai",
            accessor: (item: IUserAccess) => item.fraction?.name ?? "-",
            className: "text-left",
        },
        {
            header: "Visibilitas",
            accessor: (item: IUserAccess) =>
                item.public ? "Publik" : "Privat",
        },
        ...(permissionCheck(user, [
            "Ubah Akses Pengguna",
            "Hapus Akses Pengguna",
        ])
            ? [
                  {
                      header: "Aksi",
                      accessor: (item: IUserAccess) => (
                          <div className="flex items-center justify-center">
                              {permissionCheck(user, "Ubah Akses Pengguna") && (
                                  <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                                      <DefaultLink
                                          href={
                                              ROUTE_LISTS.get(
                                                  "access-edit"
                                              )?.replace(":id", item.id) ?? "#"
                                          }
                                      >
                                          <EditOutlined />
                                      </DefaultLink>
                                  </div>
                              )}
                              {permissionCheck(
                                  user,
                                  "Hapus Akses Pengguna"
                              ) && (
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
        setSelectedUserAccess(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IUserAccess) => {
        setSelectedUserAccess(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-access-delete");

        if (!url || !selectedUserAccess?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedUserAccess.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateUserAccess();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedUserAccess(null);
    };

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (
                !permissionCheck(user, [
                    "Lihat Akses Pengguna",
                    "Buat Akses Pengguna",
                    "Ubah Akses Pengguna",
                    "Hapus Akses Pengguna",
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
                !isLoadingUserAccess &&
                ((!dataUserAccess && errorUserAccess) ||
                    (dataUserAccess && !Array.isArray(dataUserAccess?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorUserAccess?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataUserAccess, errorUserAccess, isLoadingUserAccess]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <BadgeOutlined />
                    <h2>Manajemen Akses Pengguna</h2>
                </div>
                {permissionCheck(user, "Buat Akses Pengguna") && (
                    <Link
                        href={ROUTE_LISTS.get("access-add") ?? "#"}
                        size="sm"
                        variant="primary"
                        startIcon={<AddOutlined fontSize="small" />}
                        className="ml-auto"
                    >
                        Tambah
                    </Link>
                )}
            </div>
            <div className="relative flex justify-between">
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
                            placeholder="Semua Area"
                            firstOption={true}
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                        >
                            {dataArea?.data?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Semua Partai"
                            firstOption={true}
                            value={fractionId}
                            onChange={(e) => setFractionId(e.target.value)}
                        >
                            {dataFraction?.data?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                )}
            </div>
            <Table
                data={dataUserAccess?.data}
                columns={columns}
                isLoading={isLoadingUserAccess}
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
                    totalPages={dataUserAccess?.totalPage || 1}
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
