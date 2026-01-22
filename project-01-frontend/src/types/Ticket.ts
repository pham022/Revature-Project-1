import { Employee } from "./Employee";

export interface Ticket {
    id: number;
    price: number;
    description: string;
    status: TicketStatus;
    createdAt: string;
    createdBy: Employee;
}

export interface CreateTicketRequest {
    price: number;
    description: string;
    createdById: number;
}

export interface UpdateTicketRequest {
    price?: number;
    description?: string;
    status?: TicketStatus; // for manager only
}

export interface TicketFormData {
    price: number;
    description: string;
}

export type TicketStatus = 'PENDING' | 'APPROVED' | 'DENIED';