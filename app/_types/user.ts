import { IRole } from "./role";

export interface IProfile {
    id: string;

    userId: string;

    name: string;
    age: number | null;
    gender: string | null;
    phoneNumber: string | null;
    imageName: string | null;
    imagePath: string | null;
    imageUrl: string | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IUser {
    id: string;

    roleId: string;

    email: string;

    role: IRole | null;
    profile: IProfile | null;
    accesses: object[];
    position: object | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
