"use client";

import Lineicons from "@lineiconshq/react-lineicons";
import { XmarkOutlined } from "@lineiconshq/free-icons";
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

interface AddAlert {
    type?: AlertType;
    message?: string;
    options?: AlertOption;
}

interface AlertOption {
    autoClose?: boolean;
}

interface AlertContextValue {
    alerts: AlertItem[];
    addAlert: (param: AddAlert) => void;
    closeAlert: (id: string) => void;
}

interface AlertProviderProps {
    children: React.ReactNode;
}

//
const AlertContext = createContext<AlertContextValue | null>(null);

//
export function AlertProvider({ children }: AlertProviderProps) {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

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

    return (
        <AlertContext.Provider value={{ alerts, addAlert, closeAlert }}>
            {children}

            <div className="fixed top-5 right-5 space-y-3 z-50">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`${
                            alert.isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-5"
                        } ${
                            {
                                info: "bg-blue-100 text-blue-700 border-blue-400",
                                error: "bg-red-100 text-red-700 border-red-400",
                                success:
                                    "bg-green-100 text-green-700 border-green-400",
                                warning:
                                    "bg-yellow-100 text-yellow-700 border-yellow-400",
                            }[alert.type]
                        } min-w-72 px-4 py-3 rounded-xl shadow border-2 flex items-center justify-between gap-1.5 transform transition-all duration-300`}
                    >
                        <span>{alert.message}</span>
                        <button
                            onClick={() => closeAlert(alert.id)}
                            className="ml-3 hover:opacity-70"
                        >
                            <Lineicons icon={XmarkOutlined} />
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
