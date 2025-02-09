import { ordersRepository } from "~/utils/ordersRepository";

export const useFiguresStore = defineStore("figuresStore", () => {
    const { $apiClient } = useNuxtApp();
    const figuresRepo = figuresRepository($apiClient);

    return {
        figuresRepo,
    };
});
