"use client";

import Link from "@/app/_components/link";
import Lineicons from "@lineiconshq/react-lineicons";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import { MapMarker1Outlined, PlusOutlined } from "@lineiconshq/free-icons";

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
                    <Lineicons icon={MapMarker1Outlined} />
                    <h2>Manajemen Area</h2>
                </div>
                <Link
                    href={"#"}
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
            <Table columns={columns} data={[]} />
            <Pagination
                next={() => {}}
                previous={() => {}}
                page={1}
                totalPages={10}
            />
        </>
    );
}
