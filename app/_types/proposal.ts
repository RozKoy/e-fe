import { IArea } from "./area";
import { IUser } from "./user";
import { ICategory } from "./category";

export type ProposalStatusType = "baru" | "diproses" | "selesai";

export interface IProposal {
    id: string;

    title: string;
    status: ProposalStatusType;
    description: string;
    customCategory: string | null;

    area: IArea;
    user: IUser;
    category: ICategory;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
