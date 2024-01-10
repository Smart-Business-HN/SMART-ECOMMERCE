import { typeStatus } from "../type-status/type-status.interface";

export interface status {
    id: number,
    name: string,
    isActive: boolean,
    typeStatusId: number;
    typeStatus?: typeStatus
}