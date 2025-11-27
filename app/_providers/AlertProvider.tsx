"use client";

import {
    InfoOutline,
    ErrorOutline,
    CloseOutlined,
    CheckCircleOutline,
    WarningAmberOutlined,
} from "@mui/icons-material";
import { useState, useContext, createContext } from "react";

//
type AlertType = "success" | "error" | "info" | "warning";

interface AlertItem {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    isVisible: boolean;
}

interface AlertOption {
    autoClose?: boolean;
}

interface AddAlert {
    type?: AlertType;
    message?: string;
    options?: AlertOption;
}

export interface AlertContextValue {
    alerts: AlertItem[];
    addAlert: (param: AddAlert) => void;
    closeAlert: (id: string) => void;
    clearAlert: () => void;
}

interface AlertProviderProps {
    children: React.ReactNode;
}

//
const AlertContext = createContext<AlertContextValue | null>(null);

const typeClasses = {
    info: "bg-blue-100 text-blue-700 border-blue-400",
    error: "bg-red-100 text-red-700 border-red-400",
    success: "bg-green-100 text-green-700 border-green-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
};

const typeIcons = {
    info: <InfoOutline />,
    error: <ErrorOutline />,
    success: <CheckCircleOutline />,
    warning: <WarningAmberOutlined />,
};

//
export function AlertProvider({ children }: AlertProviderProps) {
    const [alerts, setAlerts] = useState<AlertItem[]>([
        // {
        //     id: "1",
        //     type: "info",
        //     message: "hahaha hahaha hahahah hahahah",
        //     autoClose: false,
        //     isVisible: true,
        // },
        // {
        //     id: "2",
        //     type: "error",
        //     message: "Terjadi kesalahan",
        //     autoClose: false,
        //     isVisible: true,
        // },
        // {
        //     id: "3",
        //     type: "success",
        //     message: "Berhasil banget aman banget",
        //     autoClose: false,
        //     isVisible: true,
        // },
        // {
        //     id: "4",
        //     type: "warning",
        //     message: "Hayolooo",
        //     autoClose: false,
        //     isVisible: true,
        // },
    ]);

    const addAlert = (param: AddAlert) => {
        const { type, message, options } = param;
        const id = crypto.randomUUID();

        const newAlert: AlertItem = {
            id,
            type: type ?? "success",
            message: message ?? "",
            autoClose: options?.autoClose ?? true,
            isVisible: false,
        };

        setAlerts((prev) => [...prev, newAlert]);

        setTimeout(() => {
            setAlerts((prev) =>
                prev.map((prevItem) =>
                    prevItem.id === id
                        ? { ...prevItem, isVisible: true }
                        : prevItem
                )
            );
        }, 50);

        if (newAlert.autoClose) {
            setTimeout(() => closeAlert(id), 3000);
        }
    };

    const closeAlert = (id: string) => {
        setAlerts((prev) =>
            prev.map((prevItem) =>
                prevItem.id === id
                    ? { ...prevItem, isVisible: false }
                    : prevItem
            )
        );

        setTimeout(() => {
            setAlerts((prev) => prev.filter((prevItem) => prevItem.id !== id));
        }, 500);
    };

    const clearAlert = () => {
        setAlerts((prev) =>
            prev.map((prevItem) => ({ ...prevItem, isVisible: false }))
        );

        setTimeout(() => {
            setAlerts([]);
        }, 500);
    };

    return (
        <AlertContext.Provider
            value={{ alerts, addAlert, closeAlert, clearAlert }}
        >
            {children}

            <div className="fixed top-5 right-5 space-y-3 z-45">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`${
                            alert.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-5"
                        } ${
                            typeClasses[alert.type]
                        } min-w-72 px-4 py-3 rounded-4xl shadow border-2 flex items-center justify-center gap-1.5 font-medium text-sm transform transition-all duration-300`}
                    >
                        {typeIcons[alert.type]}
                        <p>{alert.message}</p>
                        <button
                            onClick={() => closeAlert(alert.id)}
                            className="ml-auto hover:opacity-70 flex items-center justify-center"
                        >
                            <CloseOutlined fontSize="small" />
                        </button>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
}

export const useAlert = () => {
    const ctx = useContext(AlertContext);

    if (!ctx) {
        throw new Error("useAlert must be used inside AlertProvider");
    }

    return ctx;
};
