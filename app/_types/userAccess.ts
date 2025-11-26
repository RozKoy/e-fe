import { IArea } from "./area";
import { IUser } from "./user";
import { IFraction } from "./fraction";

export interface IUserAccess {
    id: string;

    public: boolean;

    area: IArea;
    user: IUser;
    fraction: IFraction;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
