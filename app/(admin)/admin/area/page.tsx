"use client";

import Link from "@/app/_components/link";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import { AddOutlined, MapOutlined } from "@mui/icons-material";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface TestInterface {
    test: string;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Area",
    },
];

const columns: Column<TestInterface>[] = [
    { header: "Name", accessor: "test" },
    { header: "Action", accessor: "test" },
];

//
export default function BaseAreaPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <MapOutlined />
                    <h2>Manajemen Area</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("area-add") ?? "#"}
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
