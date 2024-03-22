export interface CartInfo {
    eventId?: string;
    tickets?: {
    name?: string;
    details?:{
        type?: string;
        quantity?: number;
    }[]}[]
}
