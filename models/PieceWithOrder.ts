import type Piece from "./Piece";
import type StatusTracking from "./StatusTracking";

export interface PieceWithOrder extends Piece {
    status: string;
    serviceType: string;
    statusTracking: StatusTracking[];
}
