"use client";

import Link from "@/app/_components/link";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import { PlusOutlined, UserMultiple4Outlined } from "@lineiconshq/free-icons";

//
interface TestInterface {
    test: string;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Pengguna",
    },
];

const columns: Column<TestInterface>[] = [
    { header: "Name", accessor: "test" },
    { header: "Email", accessor: "test" },
    { header: "Role", accessor: "test" },
    { header: "Action", accessor: "test" },
];

//
export default function BaseUserPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <Lineicons icon={UserMultiple4Outlined} />
                    <h2>Manajemen Pengguna</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("user-add") ?? "#"}
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
