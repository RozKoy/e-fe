"use client";

import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";
import { SlidersHorizontalSquare2Outlined } from "@lineiconshq/free-icons";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Kategori",
        path: ROUTE_LISTS.get("category"),
    },
    {
        name: "Tambah",
    },
];

//
export default function AddCategoryPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Lineicons icon={SlidersHorizontalSquare2Outlined} />
                <h2>Tambah Kategori</h2>
            </div>
            <form className="grid grid-cols-1 gap-x-5 gap-y-3">
                <Label text="Nama">
                    <Input placeholder="Masukkan Nama" />
                </Label>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link
                        href={ROUTE_LISTS.get("category") ?? "#"}
                        size="sm"
                        variant="outline"
                    >
                        Kembali
                    </Link>
                    <Button size="sm" variant="outline">
                        Simpan
                    </Button>
                </div>
            </form>
        </>
    );
}
