export const useAuthStore = defineStore('authStore', () => {
    const {$apiClient} = useNuxtApp();
    const authRepo = authRepository($apiClient);

    async function verifyTOTP(totp: string) {
        return await authRepo.verifyTOTP(totp);
    }

    return {
        verifyTOTP
    }
});