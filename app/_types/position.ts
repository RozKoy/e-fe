import { ICommission } from "./commission";

type TLevel = "ketua" | "wakil" | "sekretaris" | "anggota";
type TCategory = "pimpinan" | "komisi";

export interface IPosition {
    id: string;

    commissionId: string;

    name: string;
    level: TLevel;
    category: TCategory;

    commission: ICommission;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
