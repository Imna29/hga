import type Piece from "./Piece";
import type StatusTracking from "./StatusTracking";

export default interface Order {
    id: string;
    public_id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    serviceType: string;
    userId: string;
    status: string;
    payment?: {
        status: string;
        amount: number;
    };
    _count?: {
        pieces: number;
    };
    statusTracking?: StatusTracking[];
    pieces?:Piece[];
}