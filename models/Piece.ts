import type Order from "./Order";

export default interface Piece {
    id: string;                      // UUID string
    serialNumber: number;            // Unique serial number (integer)
    userId: string;                  // User ID (string)
    orderId: string;                 // Order ID (UUID string)
    name: string;                    // Name of the piece
    images: string[];                // Array of image URLs or paths
    grade?: number;                  // Optional grade (integer)
    description?: string;            // Optional description (string)
    createdAt: Date;                 // Date when the piece was created
    updatedAt: Date;                 // Date when the piece was last updated
    order?: Order;                    // The related Order object
}