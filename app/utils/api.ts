interface ErrorInterface {
    field: string;
    message: string;
}

export function badRequestResponseFormat(
    errors: ErrorInterface[]
): Map<string, string> {
    return new Map(errors.map((err) => [err.field, err.message]));
}
