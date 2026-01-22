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
    managerId?: number; // ID of manager making the decision (for history tracking)
    comment?: string; // Comment from manager (for history tracking)
}

export interface TicketFormData {
    price: number;
    description: string;
}

export type TicketStatus = 'PENDING' | 'APPROVED' | 'DENIED';

export interface TicketStatusHistory {
    id: number;
    action: string;
    employee: Employee;
    manager?: Employee;
    amount?: number;
    comment?: string;
    timestamp: string;
}