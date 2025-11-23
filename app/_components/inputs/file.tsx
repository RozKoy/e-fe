"use client";

import { CloudUploadOutlined } from "@mui/icons-material";

//
interface FileProps {
    note?: string;
}

//
export default function File({ note }: FileProps) {
    return (
        <div className="flex items-center justify-center w-full">
            <label className="w-full h-60 bg-white hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer transition-all">
                <div className="pt-5 pb-6 flex flex-col items-center justify-center text-gray-600">
                    <CloudUploadOutlined className="mb-4" fontSize="large" />
                    <p className="mb-2 text-sm">
                        <span className="font-semibold">
                            Klik untuk mengunggah
                        </span>{" "}
                        atau seret dan lepas
                    </p>
                    <p className="text-xs">{note ?? ""}</p>
                </div>
                <input type="file" className="hidden" />
            </label>
        </div>
    );
}
