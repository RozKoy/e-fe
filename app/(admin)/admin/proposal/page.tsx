"use client";

import {
    mapRequest,
    postRequest,
    badRequestResponseFormat,
} from "@/app/_utils/api";
import {
    // EditOutlined,
    InfoOutlined,
    CloseOutlined,
    DeleteOutline,
    ArticleOutlined,
    CheckCircleOutline,
    UploadFileOutlined,
    FileDownloadOutlined,
    AssignmentReturnOutlined,
    AssignmentTurnedInOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import Link from "next/link";
import { IArea } from "@/app/_types/area";
import { IRole } from "@/app/_types/role";
import Label from "@/app/_components/label";
import { useRouter } from "next/navigation";
import { IResponse } from "@/app/_types/api";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import { ICategory } from "@/app/_types/category";
import Input from "@/app/_components/inputs/input";
import { permissionCheck } from "@/app/_utils/auth";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUser } from "@/app/_providers/UserProvider";
import Table, { Column } from "@/app/_components/table";
import DeleteModal from "@/app/_components/modals/delete";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useAlert } from "@/app/_providers/AlertProvider";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLoading } from "@/app/_providers/LoadingProvider";
import { IProposal, IProposalVote } from "@/app/_types/proposal";
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

    const searchRef = useRef<string>("");

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showImport, setShowImport] = useState<boolean>(false);
    const [showExport, setShowExport] = useState<boolean>(false);

    const [areaId, setAreaId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");

    const [roleId, setRoleId] = useState<string>("");

    const [errors, setErrors] = useState<Map<string, string> | null>(null);

    const [selectedProposal, setSelectedProposal] = useState<IProposal | null>(
        null
    );

    const [assignModal, setAssignModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
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
            areaId,
            search,
            status,
            categoryId,
        })}`
    );

    const {
        data: dataArea,
        // error: errorArea,
        // mutate: mutateArea,
        // isLoading: isLoadingArea,
    } = useSWR<IResponse<IArea[]>>(`${ROUTE_LISTS.get("api-area-get")}`);

    const {
        data: dataCategory,
        // error: errorCategory,
        // mutate: mutateCategory,
        // isLoading: isLoadingCategory,
    } = useSWR<IResponse<ICategory[]>>(
        `${ROUTE_LISTS.get("api-category-get")}`
    );

    const {
        data: dataVote,
        // error: errorVote,
        // mutate: mutateVote,
        // isLoading: isLoadingVote,
    } = useSWR<IResponse<IProposalVote>>(
        `${ROUTE_LISTS.get("api-public-proposal-vote-get")?.replace(
            ":id",
            selectedProposal?.id ?? ""
        )}`
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
            className: "text-left",
        },
        {
            header: "Nama Pengusul",
            accessor: (item: IProposal) => item.user.profile?.name ?? "-",
            className: "text-left",
        },
        { header: "Judul", accessor: "title", className: "text-left" },
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
            header: "Dewan",
            accessor: (item: IProposal) => item.peopleInCharges?.profile?.name,
            className: "text-left",
        },
        {
            header: "Ditugaskan Kepada",
            accessor: (item: IProposal) => item.assignments?.[0]?.role?.name,
        },
        {
            header: "Aksi",
            accessor: (item: IProposal) => (
                <div className="flex items-center justify-center">
                    <Link
                        href={(
                            ROUTE_LISTS.get("proposal-detail") ?? ""
                        ).replace(":id", item.id)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer transition-all"
                    >
                        <InfoOutlined />
                    </Link>
                    {((item.status === "baru" &&
                        permissionCheck(user, ["Disposisi Proposal"])) ||
                        (item.status === "diproses" &&
                            item.assignments?.[0]?.roleId === user?.roleId &&
                            item.area.id === user.accesses?.[0]?.areaId)) && (
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
                    {item.status === "diproses" &&
                        item.assignments?.[0]?.roleId === user?.roleId &&
                        item.area.id === user.accesses?.[0]?.areaId && (
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
                    {item.status !== "selesai" &&
                        permissionCheck(user, ["Hapus Proposal"]) && (
                            <button
                                className="p-1 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer transition-all"
                                onClick={() => {
                                    handleDeleteItem(item);
                                }}
                            >
                                <DeleteOutline />
                            </button>
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
                    </div> */}
                </div>
            ),
        },
    ];

    const handleDeleteClose = () => {
        setSelectedProposal(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IProposal) => {
        setSelectedProposal(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-proposal-delete");

        if (!url || !selectedProposal?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedProposal.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateProposal();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedProposal(null);
    };

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

    const handleImport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        setErrors(null);
        setErrorMessage(null);

        const url = ROUTE_LISTS.get("api-proposal-import");

        if (!url) {
            setIsLoading(false);

            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        const formData = new FormData(e.currentTarget);

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const response = await res.json();

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil melakukan import",
            });

            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        } else {
            if (Array.isArray(response.message)) {
                setErrors(badRequestResponseFormat(response.message));
            } else {
                setErrorMessage(response.message);

                alert.addAlert({
                    type: "error",
                    message: "Gagal melakukan import",
                });
            }

            setIsLoading(false);
        }
    };

    const handleExport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = ROUTE_LISTS.get("api-proposal-export");

        if (!url) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams(formData as any);

        window.open(`${url}?${params.toString()}`, "_blank");
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
            <div className="relative z-40 flex flex-wrap md:flex-nowrap justify-end md:justify-between gap-1.5">
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
                <div className="flex gap-1">
                    <Button
                        rounded="full"
                        startIcon={
                            <UploadFileOutlined
                                className="h-4 w-4 mr-2"
                                style={{ fontSize: "18px" }}
                            />
                        }
                        onClick={() => setShowImport((prev) => !prev)}
                    >
                        Import
                    </Button>
                    <Button
                        rounded="full"
                        startIcon={
                            <FileDownloadOutlined
                                className="h-4 w-4 mr-2"
                                style={{ fontSize: "18px" }}
                            />
                        }
                        onClick={() => setShowExport((prev) => !prev)}
                    >
                        Export
                    </Button>
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
                </div>
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
                            placeholder="Semua Kategori"
                            firstOption={true}
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {dataCategory?.data?.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Semua Status"
                            firstOption={true}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {["baru", "diproses", "selesai"].map(
                                (item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )
                            )}
                        </Select>
                    </div>
                )}
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
            <DeleteModal
                show={deleteModal}
                onClose={handleDeleteClose}
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
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
                                <div>
                                    <p className="font-medium text-primary">
                                        File Pendukung
                                    </p>
                                    <p>
                                        {selectedProposal?.fileUrl ? (
                                            <Link
                                                href={selectedProposal.fileUrl}
                                                target="_blank"
                                                className="font-medium text-primary hover:underline transition-all"
                                            >
                                                Buka
                                            </Link>
                                        ) : (
                                            "-"
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center gap-0.5">
                                        <ThumbUpIcon fontSize="small" />
                                        {dataVote?.data?.agree ?? 0}
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <ThumbDownIcon fontSize="small" />
                                        {dataVote?.data?.disagree ?? 0}
                                    </div>
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
            {showImport && (
                <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full backdrop-blur-xs"
                        onClick={() => {
                            setShowImport(false);
                        }}
                    ></div>
                    <div className="relative min-w-md p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3">
                        <button
                            type="button"
                            className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                            onClick={() => {
                                setShowImport(false);
                            }}
                        >
                            <CloseOutlined />
                        </button>
                        <form
                            onSubmit={handleImport}
                            className="w-full space-y-1"
                        >
                            <Label
                                text="File"
                                error={errors?.get("file")}
                                required
                            >
                                <File
                                    name="file"
                                    note=".xlsx"
                                    error={errors?.get("file")}
                                    onChange={() =>
                                        setErrors((prev) => {
                                            prev?.delete("file");
                                            return prev?.size ? prev : null;
                                        })
                                    }
                                />
                            </Label>
                            <p className="text-red-500 text-center">
                                {errorMessage && errorMessage}
                            </p>
                            <p className="font-semibold text-sm">
                                Sudah Punya Template?{" "}
                                <Link
                                    href={"/templates/proposal-import.xlsx"}
                                    className="text-primary hover:text-primary/80 hover:underline"
                                    download={true}
                                >
                                    Unduh Template
                                </Link>
                            </p>
                            <div className="w-full mt-3 flex gap-3 items-center justify-end">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setShowImport(false);
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    variant="primary"
                                    isLoading={isLoading}
                                >
                                    Import
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showExport && (
                <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full backdrop-blur-xs"
                        onClick={() => {
                            setShowExport(false);
                        }}
                    ></div>
                    <div className="relative min-w-md md:max-w-8/12 p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3">
                        <button
                            type="button"
                            className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                            onClick={() => {
                                setShowExport(false);
                            }}
                        >
                            <CloseOutlined />
                        </button>
                        <form
                            onSubmit={handleExport}
                            className="w-full space-y-1"
                        >
                            <Label text="Area">
                                <Select
                                    name="areaId"
                                    placeholder="Semua Area"
                                    firstOption={true}
                                    defaultValue={""}
                                >
                                    {dataArea?.data?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                                <Label text="Tanggal Awal">
                                    <Input name="startDate" type="date" />
                                </Label>
                                <Label text="Tanggal Akhir">
                                    <Input name="endDate" type="date" />
                                </Label>
                            </div>
                            <div className="w-full mt-3 flex gap-3 items-center justify-end">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setShowExport(false);
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    variant="primary"
                                    isLoading={isLoading}
                                >
                                    Export
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
