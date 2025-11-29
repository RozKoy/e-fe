import { ROUTE_LISTS } from "../_constants/route";
import { AlertContextValue } from "../_providers/AlertProvider";

//
type RouteType = () => string;

interface ErrorInterface {
    field: string;
    message: string;
}

interface PostRequest {
    body: object;
    alert: AlertContextValue;
    setErrors: React.Dispatch<React.SetStateAction<Map<string, string> | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    route?: string | RouteType;
    method?: RequestInit["method"];
    errorMessage?: string;
    successMessage?: string;
    preProcess?: () => void;
    successAction?: () => void;
}

//
export function badRequestResponseFormat(
    errors: ErrorInterface[]
): Map<string, string> {
    return new Map(errors.map((err) => [err.field, err.message]));
}

export async function postRequest({
    body,
    alert,
    setErrors,
    setLoading,
    setErrorMessage,
    route = "",
    method = "POST",
    errorMessage = "Gagal",
    successMessage = "Berhasil",
    preProcess = () => {},
    successAction = () => {},
}: PostRequest) {
    setLoading(true);

    setErrors(null);
    setErrorMessage(null);

    preProcess();

    const url = typeof route === "string" ? ROUTE_LISTS.get(route) : route();

    if (!url) {
        setLoading(false);

        alert.addAlert({
            type: "error",
            message: "Mohon maaf, sistem sedang bermasalah",
        });

        return;
    }

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const response = await res.json();

    if (res.ok) {
        alert.addAlert({
            type: "success",
            message: successMessage,
        });

        successAction();
    } else {
        if (Array.isArray(response.message)) {
            setErrors(badRequestResponseFormat(response.message));
        } else {
            setErrorMessage(response.message);

            alert.addAlert({
                type: "error",
                message: errorMessage,
            });
        }

        setLoading(false);
    }
}
