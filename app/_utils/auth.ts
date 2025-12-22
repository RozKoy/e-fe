import { IUser } from "../_types/user";

export function permissionCheck(
    user: IUser | null,
    permissions: string[] | string
) {
    return user?.role?.rolePermissions?.some((item) =>
        typeof permissions === "object"
            ? permissions.includes(item.permission.name)
            : item.permission.name === permissions
    );
}
