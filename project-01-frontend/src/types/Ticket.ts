export interface Ticket {
    id: number;
    price: number;
    description: string;
    status: 'PENDING' | 'APPROVED' | 'DENIED';
    createdAt: string;
    // createdBy: 
}

export interface TicketFormData {
    price: number;
    description: string;
}

export type TicketStatus = 'PENDING' | 'APPROVED' | 'DENIED';