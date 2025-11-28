"use client";

import { CloudUploadOutlined } from "@mui/icons-material";

//
interface FileProps {
    name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
    note?: string;
    error?: string;
    onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

//
export default function File({ name, note, error, onChange }: FileProps) {
    return (
        <label
            className={`${
                error ? "border-red-300" : "border-primary/80"
            } w-full h-60 bg-white hover:bg-gray-50 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all`}
        >
            <div className="pt-5 pb-6 flex flex-col items-center justify-center text-gray-600">
                <CloudUploadOutlined
                    className="mb-2 text-primary"
                    sx={{ fontSize: "4rem" }}
                />
                <p className="mb-2 text-sm">
                    <span className="font-semibold">Klik untuk mengunggah</span>{" "}
                    atau seret dan lepas
                </p>
                <p className="text-xs">{note ?? ""}</p>
            </div>
            <input
                type="file"
                name={name}
                className="hidden"
                onChange={onChange}
            />
        </label>
    );
}
