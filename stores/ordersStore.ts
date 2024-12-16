import { ordersRepository } from "~/utils/ordersRepository";

export const useOrdersStore = defineStore("ordersStore", () => {
	const { $apiClient } = useNuxtApp();
	const ordersRepo = ordersRepository($apiClient);

	return {
		ordersRepo,
	};
});
