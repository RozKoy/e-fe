"use client";

import {
    PlusOutlined,
    SlidersHorizontalSquare2Outlined,
} from "@lineiconshq/free-icons";
import Link from "@/app/_components/link";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Lineicons from "@lineiconshq/react-lineicons";
import Pagination from "@/app/_components/pagination";
import Table, { Column } from "@/app/_components/table";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface TestInterface {
    test: string;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Kategori",
    },
];

const columns: Column<TestInterface>[] = [
    { header: "Name", accessor: "test" },
    { header: "Action", accessor: "test" },
];

//
export default function BaseCategoryPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center">
                <div className="flex items-center gap-1.5">
                    <Lineicons icon={SlidersHorizontalSquare2Outlined} />
                    <h2>Manajemen Kategori</h2>
                </div>
                <Link
                    href={ROUTE_LISTS.get("category-add") ?? "#"}
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
