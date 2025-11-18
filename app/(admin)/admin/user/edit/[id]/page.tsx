import Link from "@/app/_components/link";
import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import Select from "@/app/_components/inputs/select";
import Lineicons from "@lineiconshq/react-lineicons";
import { ROUTE_LISTS } from "@/app/_constants/route";
import { UserMultiple4Outlined } from "@lineiconshq/free-icons";
import Breadcrumb, { BreadcrumbItem } from "@/app/_components/breadcrumb";

//
interface Param {
    id: string;
}

interface EditUserPageProps {
    params: Promise<Param>;
}

//
const breadcrumbItems: BreadcrumbItem[] = [
    {
        name: "Pengguna",
        path: ROUTE_LISTS.get("user"),
    },
    {
        name: "Ubah",
    },
];

//
export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params;

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-1.5">
                <Lineicons icon={UserMultiple4Outlined} />
                <h2>Ubah Pengguna (id: {id})</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                <Label text="Nama">
                    <Input placeholder="Masukkan Nama" />
                </Label>
                <Label text="Email">
                    <Input placeholder="email@example.com" />
                </Label>
                <Label text="Password">
                    <Input placeholder="###" />
                </Label>
                <Label text="Hak Akses">
                    <Select placeholder="Pilih hak akses"></Select>
                </Label>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <Link
                        href={ROUTE_LISTS.get("user") ?? "#"}
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
