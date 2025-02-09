
export const useAdminStore = defineStore("adminStore", () => {
    const { $apiClient } = useNuxtApp();
    const adminRepo = adminRepository($apiClient);

    return {
        adminRepo,
    };
});
