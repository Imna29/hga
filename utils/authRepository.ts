import type { $Fetch, NitroFetchRequest } from "nitropack";


export const authRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    async verifyTOTP(totp: string) {
        return await fetch("/auth/verify-totp", {
            method: "POST",
            body: JSON.stringify({ code: totp }),
        });
    }

});