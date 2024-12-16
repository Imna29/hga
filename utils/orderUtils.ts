export function formatStatus(status: string) {
    switch (status) {
        case "PENDING_PAYMENT":
            return {
                label: "Unpaid",
                severity: "danger",
            };
        case "AWAITING_SHIPMENT":
            return {
                label: "Awaiting Shipment",
                severity: "warn",
            };
        case "IN_GRADING":
            return {
                label: "In Grading",
                severity: "info",
            };
        case "GRADING_COMPLETE":
            return {
                label: "Grading Complete",
                severity: "success",
            };
        case "SHIPPED_BACK":
            return {
                label: "Shipped Back",
                severity: "success",
            };
        default:
            return {
                label: "Unknown",
                severity: "info",
            };
    }
}

export function formatPieceStatus(grade: number | null) {
    switch (grade) {
        case null:
            return {
                label: "Not Graded",
                severity: "danger",
            };
        default:
            return {
                label: grade,
                severity: "info",
            }
    }
}