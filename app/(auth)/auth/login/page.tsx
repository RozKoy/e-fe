import Label from "@/app/_components/label";
import Button from "@/app/_components/button";
import Input from "@/app/_components/inputs/input";
import Password from "@/app/_components/inputs/password";

export default function LoginPage() {
    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-11/12 md:w-xl p-10 rounded-lg bg-white flex flex-col gap-6 shadow">
                <h1 className="md:text-center">
                    Selamat Datang di SIMRESES DPRD Provinsi Lampung
                </h1>
                <form className="flex flex-col gap-3">
                    <Label text="Email">
                        <Input placeholder="Masukkan email" />
                    </Label>
                    <Label text="Kata Sandi">
                        <Password />
                    </Label>
                    <Button variant="outline">Masuk</Button>
                </form>
            </div>
        </div>
    );
}
