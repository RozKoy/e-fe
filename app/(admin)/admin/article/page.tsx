"use client";

import {
    AddOutlined,
    EditOutlined,
    DeleteOutline,
    NewspaperOutlined,
} from "@mui/icons-material";
import useSWR from "swr";
import DefaultLink from "next/link";
import Link from "@/app/_components/link";
import { IResponse } from "@/app/_types/api";
import { IArticle } from "@/app/_types/article";
import { permissionCheck } from "@/app/_utils/auth";
import { useEffect, useRef, useState } from "react";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import Pagination from "@/app/_components/pagination";
import { useUser } from "@/app/_providers/UserProvider";
import Table, { Column } from "@/app/_components/table";
import { useAlert } from "@/app/_providers/AlertProvider";
import DeleteModal from "@/app/_components/modals/delete";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Berita",
    },
];

const limitOptions: number[] = [5, 10, 15, 20, 25, 50];

//
export default function BaseArticlePage() {
    const alert = useAlert();
    const { user } = useUser();

    const hasError = useRef<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedArticle, setSelectedArticle] = useState<IArticle | null>(
        null
    );

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        data: dataArticle,
        error: errorArticle,
        mutate: mutateArticle,
        isLoading: isLoadingArticle,
    } = useSWR<IResponse<IArticle[]>>(
        `${ROUTE_LISTS.get("api-article-get")}?${new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            // search: "",
            // categoryId: "",
        })}`
    );

    const columns: Column<IArticle>[] = [
        {
            header: "Tanggal",
            accessor: (item: IArticle) =>
                new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }),
        },
        { header: "Judul", accessor: "title" },
        {
            header: "Kategori",
            accessor: (item: IArticle) => item.category?.name,
        },
        ...(permissionCheck(user, ["Ubah Berita", "Hapus Berita"])
            ? [
                  {
                      header: "Aksi",
                      accessor: (item: IArticle) => (
                          <div className="flex items-center justify-center">
                              {permissionCheck(user, "Ubah Berita") && (
                                  <div className="p-1 rounded-lg hover:bg-yellow-100 text-yellow-500 cursor-pointer transition-all">
                                      <DefaultLink
                                          href={
                                              ROUTE_LISTS.get(
                                                  "article-edit"
                                              )?.replace(":id", item.id) ?? "#"
                                          }
                                      >
                                          <EditOutlined />
                                      </DefaultLink>
                                  </div>
                              )}
                              {permissionCheck(user, "Hapus Berita") && (
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
        setSelectedArticle(null);
        setDeleteModal(false);
    };

    const handleDeleteItem = (item: IArticle) => {
        setSelectedArticle(item);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        let url = ROUTE_LISTS.get("api-article-delete");

        if (!url || !selectedArticle?.id) {
            alert.addAlert({
                type: "error",
                message: "Mohon maaf, sistem sedang bermasalah",
            });

            return;
        }

        setIsLoading(true);

        url = url.replace(":id", selectedArticle.id);

        const res = await fetch(url, { method: "DELETE" });

        if (res.ok) {
            alert.addAlert({
                type: "success",
                message: "Berhasil menghapus data",
            });
            await mutateArticle();
        } else {
            alert.addAlert({
                type: "error",
                message: "Gagal menghapus data",
            });
        }

        setIsLoading(false);
        setDeleteModal(false);
        setSelectedArticle(null);
    };

    useEffect(() => {
        if (!hasError.current) {
            if (
                !isLoadingArticle &&
                ((!dataArticle && errorArticle) ||
                    (dataArticle && !Array.isArray(dataArticle?.data)))
            ) {
                alert.addAlert({
                    type: "error",
                    message: errorArticle?.message || "Gagal memuat data",
                    options: { autoClose: false },
                });
                hasError.current = true;
            }
        }
    }, [alert, dataArticle, errorArticle, isLoadingArticle]);

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5 font-semibold text-lg text-primary">
                    <NewspaperOutlined />
                    <h2>Manajemen Berita</h2>
                </div>
                {permissionCheck(user, "Buat Berita") && (
                    <Link
                        href={ROUTE_LISTS.get("article-add") ?? "#"}
                        size="sm"
                        variant="primary"
                        startIcon={<AddOutlined fontSize="small" />}
                        className="ml-auto"
                    >
                        Tambah
                    </Link>
                )}
            </div>
            <Table
                data={dataArticle?.data}
                columns={columns}
                isLoading={isLoadingArticle}
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
                    totalPages={dataArticle?.totalPage || 1}
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
