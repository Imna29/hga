import type { Carrier } from "./Carrier";
import type Order from "./Order";


export default interface StatusTracking {
    id: string; // UUID, represented as a string
    orderId: string; // UUID, represented as a string
    status: string;
    description?: string; // Optional field
    createdAt: Date; // DateTime, mapped to JavaScript Date
    trackingCode?: string; // Optional field
    carrier?: Carrier; // Optional Carrier enum value
    order?: Order; // Related Order object
}
