"use client";

import Button from "../button";
import { CloseOutlined, ErrorOutlineOutlined } from "@mui/icons-material";

//
interface DeleteModalProps {
    show?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    isLoading?: boolean;
}

//
export default function DeleteModal({
    show = false,
    onClose,
    onConfirm,
    isLoading,
}: DeleteModalProps) {
    return (
        <>
            {show && (
                <div className="fixed left-0 top-0 z-40 w-full h-full flex items-center justify-center">
                    <div
                        className="absolute w-full h-full backdrop-blur-xs"
                        onClick={onClose}
                    ></div>
                    <div className="relative min-w-md p-8 rounded-xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-3">
                        <button
                            type="button"
                            className="absolute p-1 rounded-xl hover:bg-gray-100 right-3 top-3 transition-all"
                            onClick={onClose}
                        >
                            <CloseOutlined />
                        </button>
                        <ErrorOutlineOutlined
                            className="text-red-500"
                            sx={{ fontSize: "4rem" }}
                        />
                        <p>Apakah Anda yakin ingin menghapus data ini?</p>
                        <div className="mt-3 flex gap-3 items-center justify-center">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={onClose}
                            >
                                Tidak, batalkan
                            </Button>
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={onConfirm}
                                isLoading={isLoading}
                            >
                                Ya, hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
