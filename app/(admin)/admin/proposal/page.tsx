"use client";

import {
    // EditOutlined,
    CloseOutlined,
    // DeleteOutline,
    ArticleOutlined,
    CheckCircleOutline,
    AssignmentReturnOutlined,
    AssignmentTurnedInOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
// import DefaultLink from "next/link";
import { IRole } from "@/app/_types/role";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import { IProposal } from "@/app/_types/proposal";
import { permissionCheck } from "@/app/_utils/auth";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { useUser } from "@/app/_providers/UserProvider";
import Table, { Column } from "@/app/_components/table";
// import DeleteModal from "@/app/_components/modals/delete";
import { useAlert } from "@/app/_providers/AlertProvider";
import { mapRequest, postRequest } from "@/app/_utils/api";
import { useLoading } from "@/app/_providers/LoadingProvider";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Usulan",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseProposalPage() {
    const alert = useAlert();
    const router = useRouter();
    const { user } = useUser();
    const { setRootLoading } = useLoading();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [roleId, setRoleId] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const [selectedProposal, setSelectedProposal] = useState<IProposal | null>(
        null
    );

    const [assignModal, setAssignModal] = useState<boolean>(false);
    // const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [finishModal, setFinishModal] = useState<boolean>(false);

    const {
        data: dataProposal,
        error: errorProposal,
        mutate: mutateProposal,
        isLoading: isLoadingProposal,
    } = useSWR<IResponse<IProposal[]>>(
        `${ROUTE_LISTS.get("api-proposal-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
        })}`
    );

    const { data: dataRole } = useSWR<IResponse<IRole[]>>(
        `${ROUTE_LISTS.get("api-role-get")}`
    );

    const columns: Column<IProposal>[] = [
        {
            header: "Tanggal",
            accessor: (item: IProposal) =>
                new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }),
        },
        {
            header: "Dapil",
            accessor: (item: IProposal) => (
                <p className="max-w-72 text-left">{item.area?.name ?? "-"}</p>
            ),
        },
        {
            header: "Nama Pengusul",
            accessor: (item: IProposal) => item.user.profile?.name ?? "-",
        },
        { header: "Judul", accessor: "title" },
        {
            header: "Kategori",
            accessor: (item: IProposal) =>
                item.category?.name ?? item.customCategory,
        },
        {
            header: "Status",
            accessor: (item: IProposal) => (
                <div
                    className={`${
                        item.status === "baru"
                            ? "bg-blue-300/50"
                            : item.status === "diproses"
                            ? "bg-yellow-300/50"
                            : "bg-green-300/50"
                    } w-fit mx-auto px-3 py-0.5 rounded-full font-medium text-sm`}
                >
                    {item.status}
                </div>
            ),
        },
        {
            header: "Aksi",
            accessor: (item: IProposal) => (
                <div className="flex items-center justify-center">
                    {permissionCheck(user, "Disposisi Proposal") && (
                        <>
                            {(item.status === "baru" ||
                                item.status === "diproses") && (
                                <button
                                    className="p-1 rounded-lg hover:bg-blue-100 text-blue-500 cursor-pointer transition-all"
                                    onClick={() => {
                                        setAssignModal(true);
                                        setSelectedProposal(item);
                                    }}
                                >
                                    <AssignmentReturnOutlined />
                                </button>
                            )}
                            {item.status === "diproses" && (
                                <button
                                    className="p-1 rounded-lg hover:bg-green-100 text-green-500 cursor-pointer transition-all"
                                    onClick={() => {
                                        setFinishModal(true);
                                        setSelectedProposal(item);
                                    }}
                                >
                                    <AssignmentTurnedInOutlined />
                                </button>
                            )}
                        </>
                    )}
                    {/* <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                        <DefaultLink
                            href={
                                ROUTE_LISTS.get("role-edit")?.replace(
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
                    </button> */}
                </div>
            ),
        },
    ];

    // const handleDeleteClose = () => {
    //     setSelectedProposal(null);
    //     setDeleteModal(false);
    // };

    // const handleDeleteItem = (item: IProposal) => {
    //     setSelectedProposal(item);
    //     setDeleteModal(true);
    // };

    // const handleDelete = async () => {
    //     let url = ROUTE_LISTS.get("api-role-delete");

    //     if (!url || !selectedProposal?.id) {
    //         alert.addAlert({
    //             type: "error",
    //             message: "Mohon maaf, sistem sedang bermasalah",
    //         });

    //         return;
    //     }

    //     setIsLoading(true);

    //     url = url.replace(":id", selectedProposal.id);

    //     const res = await fetch(url, { method: "DELETE" });

    //     if (res.ok) {
    //         alert.addAlert({
    //             type: "success",
    //             message: "Berhasil menghapus data",
    //         });
    //         await mutateProposal();
    //     } else {
    //         alert.addAlert({
    //             type: "error",
    //             message: "Gagal menghapus data",
    //         });
    //     }

    //     setIsLoading(false);
    //     setDeleteModal(false);
    //     setSelectedProposal(null);
    // };

    const handleAssign = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await postRequest({
            body: mapRequest({
                roleId,
                proposalId: selectedProposal?.id,
            }),
            alert,
            setErrors,
            setLoading: setIsLoading,
            setErrorMessage,
            route: "api-proposal-assign",
            errorMessage: "Gagal menugaskan usulan",
            successMessage: "Berhasil menugaskan usulan",
            successAction: async () => {
                await mutateProposal();

                setIsLoading(false);
                setAssignModal(false);
                setSelectedProposal(null);
            },
        });
    };

    const handleFinish = async () => {
        await postRequest({
            body: mapRequest({
                proposalId: selectedProposal?.id,
            }),
            alert,
            setErrors,
            setLoading: setIsLoading,
            setErrorMessage,
            route: () =>
                ROUTE_LISTS.get("api-proposal-finish")?.replace(
                    ":id",
                    selectedProposal?.id ?? ""
                ) ?? "",
            errorMessage: "Gagal menyelesaikan usulan",
            successMessage: "Berhasil menyelesaikan usulan",
            successAction: async () => {
                await mutateProposal();

                setIsLoading(false);
                setFinishModal(false);
                setSelectedProposal(null);
            },
        });
    };

    useEffect(() => {
        setRootLoading(true);

        if (user) {
            if (
                !permissionCheck(user, [
                    "Lihat Disposisi Proposal",
                    "Disposisi Proposal",
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
                !isLoadingProposal &&
                ((!dataProposal && errorProposal) ||
                    (dataProposal && !Array.isArray(dataProposal?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorProposal?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataProposal, errorProposal, isLoadingProposal]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <ArticleOutlined />
                    <h2>Manajemen Usulan</h2>
                </div>
            </div>
            <Table
                data={dataProposal?.data}
                columns={columns}
                isLoading={isLoadingProposal}
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
                    totalPages={dataProposal?.totalPage || 1}
                />
            </div>
            {/* <DeleteModal
                show={deleteModal}
                onClose={handleDeleteClose}
                onConfirm={handleDelete}
                isLoading={isLoading}
            /> */}
            {assignModal && selectedProposal && (
                <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full backdrop-blur-xs"
                        onClick={() => {
                            setAssignModal(false);
                            setSelectedProposal(null);
                        }}
                    ></div>
                    <form
                        onSubmit={handleAssign}
                        className="relative min-w-4xl max-w-6xl p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3"
                    >
                        <button
                            type="button"
                            className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                            onClick={() => {
                                setAssignModal(false);
                                setSelectedProposal(null);
                            }}
                        >
                            <CloseOutlined />
                        </button>
                        <div className="w-full space-x-5 space-y-3">
                            <input
                                type="hidden"
                                name="proposalId"
                                value={selectedProposal.id}
                            />
                            <div className="grid md:grid-cols-2 gap-x-5 gap-y-3">
                                <div>
                                    <p className="font-medium text-primary">
                                        Tanggal
                                    </p>
                                    <p>
                                        {new Date(
                                            selectedProposal.createdAt
                                        ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-primary">
                                        Daerah Pilihan
                                    </p>
                                    <p>{selectedProposal.area?.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-primary">
                                        Judul
                                    </p>
                                    <p>{selectedProposal.title}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-primary">
                                        Deskripsi
                                    </p>
                                    <p>{selectedProposal.description}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-primary">
                                        Kategori
                                    </p>
                                    <p>
                                        {selectedProposal.category?.name ??
                                            selectedProposal.customCategory}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-primary">
                                        Status
                                    </p>
                                    <p
                                        className={`${
                                            selectedProposal.status === "baru"
                                                ? "bg-blue-300/50"
                                                : selectedProposal.status ===
                                                  "diproses"
                                                ? "bg-yellow-300/50"
                                                : "bg-green-300/50"
                                        } w-fit mr-auto px-3 py-0.5 rounded-full font-medium text-sm`}
                                    >
                                        {selectedProposal.status}
                                    </p>
                                </div>
                            </div>
                            <Label
                                text="Peran"
                                error={errors?.get("roleId")}
                                required
                            >
                                <Select
                                    name="roleId"
                                    error={errors?.get("roleId")}
                                    placeholder="Pilih peran"
                                    defaultValue={""}
                                    onChange={(e) => {
                                        setRoleId(e.target.value);
                                        setErrors((prev) => {
                                            prev?.delete("roleId");
                                            return prev?.size ? prev : null;
                                        });
                                    }}
                                >
                                    {dataRole?.data?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                            <p className="text-red-500 text-center">
                                {errorMessage && errorMessage}
                            </p>
                        </div>
                        <div className="w-full mt-3 flex gap-3 items-center justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setAssignModal(false);
                                    setSelectedProposal(null);
                                }}
                            >
                                Tutup
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                isLoading={isLoading}
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            )}
            {finishModal && selectedProposal && (
                <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full backdrop-blur-xs"
                        onClick={() => {
                            setFinishModal(false);
                            setSelectedProposal(null);
                        }}
                    ></div>
                    <div className="relative min-w-md p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3">
                        <button
                            type="button"
                            className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                            onClick={() => {
                                setFinishModal(false);
                                setSelectedProposal(null);
                            }}
                        >
                            <CloseOutlined />
                        </button>
                        <CheckCircleOutline
                            className="text-primary"
                            sx={{ fontSize: "4rem" }}
                        />
                        <p>Apakah Anda yakin ingin menyelesaikan usulan ini?</p>
                        <div className="mt-3 flex gap-3 items-center justify-center">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setFinishModal(false);
                                    setSelectedProposal(null);
                                }}
                            >
                                Tidak, batalkan
                            </Button>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={handleFinish}
                                isLoading={isLoading}
                            >
                                Ya, selesaikan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
