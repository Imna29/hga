import type { $Fetch, NitroFetchRequest } from "nitropack";
import type Order from "~/models/Order";
import type Piece from "~/models/Piece";
import type StatusTracking from "~/models/StatusTracking";

export const ordersRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
	async createOrder(order: {
		type: string;
		quantity: number;
	}) {
		return fetch<Order>("/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(order),
		});
	},

	async createOrderItem(orderId: string, orderItem: FormData) {
		return fetch<Order>("/orders/" + orderId + "/item", {
			method: "POST",
			body: orderItem,
		});
	},

	async createCheckoutSession(orderId: string) {
		return fetch<string>("/stripe/checkout-session", {
			method: "POST",
			body: JSON.stringify({ orderId }),
		});
	},

	async getOrders() {
		return fetch<Order[]>("/orders");
	},

	async getStatusUpdates(orderId: string) {
		return fetch<StatusTracking[]>("/orders/" + orderId + "/status-updates");
	},

	async getPieces(orderId: string) {
		return fetch<Piece[]>("/orders/" + orderId + "/pieces");
	},

	async getLatestStatusUpdates() {
		return fetch<StatusTracking[]>("/orders/status-updates/latest");
	},

	async getActiveOrdersCount() {
		return fetch<number>("/orders/stats/active-count");
	},

	async getFiguresCount() {
		return fetch<number>("/orders/stats/figures-count");
	},

	async getAverageGrade() {
		return fetch<number>("/orders/stats/average-grade");
	},

	async getCompletedOrdersCount() {
		return fetch<number>("/orders/stats/completed-count");
	},

	async getPendingOrdersCount() {
		return fetch<number>("/orders/stats/pending-count");
	},

	async getOrder(orderId: string) {
		return fetch<Order>("/orders/" + orderId);
	},

	async deleteOrder(orderId: string) {
		return fetch<{ message: string }>("/orders/" + orderId, {
			method: "DELETE",
		});
	}
});
