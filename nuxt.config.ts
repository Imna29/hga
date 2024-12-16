import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    ssr: true,
    devtools: {enabled: false},
    modules: [
      "@pinia/nuxt",
      "@vee-validate/nuxt",
      "@primevue/nuxt-module",
      "@nuxtjs/tailwindcss",
      "@nuxt/fonts",
      "@nuxt/image",
      "vue-clerk/nuxt",
      '@vee-validate/nuxt',
      "@nuxtjs/color-mode",
    ],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
        }
    },

    routeRules: {
        '/dashboard/**': {ssr: true},
        '/api/**': {
            proxy: process.env.NUXT_PUBLIC_API_BASE_URL + "/**"
        }
    },
    app: {
       
    },
    primevue: {
        importTheme: {from: '~/themes/theme.js'}
    },

    css: ["primeicons/primeicons.css"],
    fonts: {
        providers: {
            adobe: false,
        },
    },
});