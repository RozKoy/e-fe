export interface IResponse<T> {
    code?: number;
    status?: string;
    message?: string;
    data?: T;
    totalData?: number;
    totalPage?: number;
}
