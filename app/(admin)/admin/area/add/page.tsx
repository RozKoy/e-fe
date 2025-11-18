"use client";

import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { MapMarker1Outlined } from "@lineiconshq/free-icons";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Area",
        path: ROUTE_LISTS.get("area"),
    },
    {
        name: "Tambah",
    },
];

//
export default function AddAreaPage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Lineicons icon={MapMarker1Outlined} />
                <h2>Tambah Area</h2>
            </div>
            <form className="grid grid-cols-1 gap-x-5 gap-y-3">
                <Label text="Nama">
                    <Input placeholder="Masukkan Nama" />
                </Label>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link
                        href={ROUTE_LISTS.get("area") ?? "#"}
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
