"use client";

import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Checkbox from "@/app/_components/inputs/checkbox";
import { Shield2Outlined } from "@lineiconshq/free-icons";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Peran",
        path: ROUTE_LISTS.get("role"),
    },
    {
        name: "Tambah",
    },
];

const dummyPermissions = [
    {
        group: "Manajemen Pengguna",
        items: [
            {
                id: "1",
                name: "Tambah Pengguna",
            },
            {
                id: "2",
                name: "Ubah Pengguna",
            },
            {
                id: "3",
                name: "Hapus Pengguna",
            },
            {
                id: "1",
                name: "Tambah Pengguna",
            },
            {
                id: "2",
                name: "Ubah Pengguna",
            },
            {
                id: "3",
                name: "Hapus Pengguna",
            },
        ],
    },
    {
        group: "Manajemen Peran",
        items: [
            {
                id: "4",
                name: "Tambah Peran",
            },
            {
                id: "5",
                name: "Ubah Peran",
            },
            {
                id: "6",
                name: "Hapus Peran",
            },
        ],
    },
    {
        group: "Manajemen Pengguna",
        items: [
            {
                id: "1",
                name: "Tambah Pengguna",
            },
            {
                id: "2",
                name: "Ubah Pengguna",
            },
            {
                id: "3",
                name: "Hapus Pengguna",
            },
        ],
    },
    {
        group: "Manajemen Peran",
        items: [
            {
                id: "4",
                name: "Tambah Peran",
            },
            {
                id: "5",
                name: "Ubah Peran",
            },
            {
                id: "6",
                name: "Hapus Peran",
            },
        ],
    },
];

//
export default function AddRolePage() {
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Lineicons icon={Shield2Outlined} />
                <h2>Tambah Peran</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                <Label text="Nama">
                    <Input placeholder="Masukkan Nama" />
                </Label>
                <Label text="Deskripsi">
                    <Input placeholder="Masukkan Deskripsi" />
                </Label>
                <Label text="Pilih Hak Akses" />
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {dummyPermissions.map((item, index) => (
                        <div key={index}>
                            <p className="font-semibold">{item.group}</p>
                            <div className="flex flex-col">
                                {item.items.map((item, index) => (
                                    <Checkbox
                                        key={index}
                                        text={item.name}
                                        value={item.id}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link
                        href={ROUTE_LISTS.get("role") ?? "#"}
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
