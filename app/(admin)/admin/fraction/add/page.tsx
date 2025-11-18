"use client";

import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import File from "@/app/_components/inputs/file";
import Input from "@/app/_components/inputs/input";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { Hierarchy1Outlined } from "@lineiconshq/free-icons";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Partai",
        path: ROUTE_LISTS.get("fraction"),
    },
    {
        name: "Tambah",
    },
];

//
export default function AddFractionPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Lineicons icon={Hierarchy1Outlined} />
                <h2>Tambah Partai</h2>
            </div>
            <form className="flex flex-col gap-x-5 gap-y-3">
                <Label text="Nama">
                    <Input placeholder="Masukkan Nama" />
                </Label>
                <Label text="Gambar">
                    <File note="PNG, JPG, dll" />
                </Label>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link
                        href={ROUTE_LISTS.get("fraction") ?? "#"}
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
