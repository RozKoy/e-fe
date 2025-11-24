import { IPermission } from "./permission";

export interface IRolePermission {
    id: string;

    roleId: string;
    permissionId: string;

    permission: IPermission;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IRole {
    id: string;

    name: string;
    description: string | null;

    rolePermissions?: IRolePermission[];

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
