export interface ApiResponse {
    message: string;
    succeeded: boolean;
    errors: null|string[];
    pageNumber?: number;
    pageSize?: number;
    totalItems?:number;
}