export interface IResponse<T> {
    status?: string;
    message?: string;
    data?: T;
    totalData?: number;
    totalPage?: number;
}
