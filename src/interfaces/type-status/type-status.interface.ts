import { status } from "../status/status.interface";

export interface typeStatus {
    id: number,
    name: string,
    isActive: boolean,
    status?: status[]
}