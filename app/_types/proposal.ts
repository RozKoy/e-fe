import { IArea } from "./area";
import { IUser } from "./user";
import { ICategory } from "./category";
import { IRole } from "./role";

export type ProposalStatusType = "baru" | "diproses" | "selesai";

export interface IProposal {
    id: string;

    title: string;
    status: ProposalStatusType;
    description: string;
    customCategory: string | null;
    fileName: string | null;
    filePath: string | null;
    fileUrl: string | null;

    area: IArea;
    user: IUser;
    category: ICategory;
    assignments: IProposalAssignment[];

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IProposalAssignment {
    id: string;

    roleId: string;
    proposalId: string;

    role: IRole;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IProposalVote {
    total: number;
    agree: number;
    disagree: number;
}

export interface IProposalSelfVote {
    id: string;

    userId: string;
    proposalId: string;

    agree: boolean;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IProposalDiscussion {
    data: {
        id: string;

        userId: string;
        proposalId: string;

        message: string;

        user: IUser;

        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    }[];
    totalData: number;
    totalPages: number;
}
