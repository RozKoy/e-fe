import { ICategory } from "./category";

export interface IArticle {
    id: string;

    categoryId: string;

    date: string;
    title: string;
    content: string;
    imageUrl: string | null;
    imageName: string | null;
    imagePath: string | null;

    category: ICategory;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
