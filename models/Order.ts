export default interface Order {
    id: string;
    public_id: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
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
}