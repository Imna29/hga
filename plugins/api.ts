export default defineNuxtPlugin({
    parallel: true,
    setup() {
        const apiClient = $fetch.create({
            baseURL: "/api",
            credentials: "include",
        });

        return {
            provide: {
                apiClient
            }
        }
    }
});