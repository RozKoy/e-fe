import { IArea } from "./area";
import { IUser } from "./user";
import { IFraction } from "./fraction";

export interface IUserAccess {
    id: string;

    areaId: string;
    userId: string;
    fractionId: string;

    public: boolean;

    area: IArea;
    user: IUser;
    fraction: IFraction;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
