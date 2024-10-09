import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  css: ["primeicons/primeicons.css"],
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyCRcqrfTF2dAUPblkogkqrooJJsZfFkFUA",
      authDomain: "hga-authentication-28944.firebaseapp.com",
      projectId: "hga-authentication-28944",
      storageBucket: "hga-authentication-28944.appspot.com",
      messagingSenderId: "74378540795",
      appId: "1:74378540795:web:f61b57f8f4571f36bba25e",
      measurementId: "G-3RM8F287Q3",
    },
  },
  fonts: {
    providers: {
      adobe: false,
    },
  },
});
