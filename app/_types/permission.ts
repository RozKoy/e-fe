export interface IPermission {
    id: string;

    name: string;
    group: string;
    description: string | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
