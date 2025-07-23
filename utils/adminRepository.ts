import type { $Fetch, NitroFetchRequest } from "nitropack";
import type Order from "~/models/Order";
import type Piece from "~/models/Piece";

function transformDates<T extends object>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: typeof value === 'string' && isDateString(value)
      ? new Date(value)
      : value
  }), {} as T);
}

function isDateString(value: string): boolean {
  return !isNaN(Date.parse(value)) && /^\d{4}-\d{2}-\d{2}/.test(value);
}

export const adminRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getOrders() {
    const orders = await fetch<Order[]>("/admin/orders");
    return orders.map(order => transformDates(order));
  },
  async getFigure(id: string) {
    return fetch<Piece>(`/admin/figures/${id}`);
  },
  async getOrder(id: string) {
    return fetch<Order>(`/admin/orders/${id}`);
  },
  async updateOrderStatus(id: string, status: string) {
    return fetch<Order>(`/admin/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },
  async addStatusUpdate(orderId: string, status: string, description: string, trackingCode: string) {
    if (!status) {
      throw new Error("Title is required");
    }

    if (!description) {
      throw new Error("Description is required");
    }

    return fetch<Order>(`/admin/orders/${orderId}/status-update`, {
      method: "POST",
      body: JSON.stringify({ status, description, trackingCode })
    });
  },
  async updatePieceGrade(id: string, grade: number, isPristine: boolean) {
    return fetch<Piece>(`/admin/figures/${id}/grade`, {
      method: "PATCH",
      body: JSON.stringify({ grade, isPristine })
    });
  },
  async updatePieceCertificate(id: string, data: FormData) {
    return fetch<Order>("/admin/figures/" + id + "/certificate", {
      method: "POST",
      body: data,
    });
  },
  async deleteOrder(id: string) {
    return fetch<Order>(`/admin/orders/${id}`, {
      method: "DELETE"
    });
  }
});
