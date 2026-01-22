import { Employee } from "./Employee";

export interface Ticket {
    id: number;
    price: number;
    description: string;
    status: 'PENDING' | 'APPROVED' | 'DENIED';
    createdAt: string;
    // createdBy: Employee;
}

export interface TicketFormData {
    price: number;
    description: string;
}

export type TicketStatus = 'PENDING' | 'APPROVED' | 'DENIED';