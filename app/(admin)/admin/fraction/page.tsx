"use client";

import Link from "@/app/_components/link";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { AddOutlined, Diversity2Outlined } from "@mui/icons-material";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface TestInterface {
    test: string;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Partai",
    },
];

const columns: Column<TestInterface>[] = [
    { header: "Name", accessor: "test" },
    { header: "Image", accessor: "test" },
    { header: "Action", accessor: "test" },
];

//
export default function BaseFractionPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <Diversity2Outlined />
                    <h2>Manajemen Partai</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("fraction-add") ?? "#"}
                    size="sm"
                    variant="outline"
                    startIcon={<AddOutlined />}
                    className="ml-auto"
                >
                    Tambah
                </Link>
            </div>
            <Table columns={columns} data={[]} />
            <Pagination page={1} totalPages={10} />
        </>
    );
}
