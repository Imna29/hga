import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "@primevue/nuxt-module",
    "@nuxt/fonts",
    "@nuxt/image",
    "@clerk/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    "/dashboard/**": { ssr: false },
    "/certificate/**": { ssr: false },
    "/api/**": {
      proxy: process.env.NUXT_PUBLIC_API_BASE_URL + "/**",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        class: "dark-mode",
      },
      script: [
        {
          innerHTML: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/68433011f8ef69190eb671c0/1it377hl0';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);
                    })();
                `,
          type: "text/javascript",
        },
      ],
    },
  },
  primevue: {
    importTheme: { from: "~/themes/theme.js" },
    components: {
      exclude: ["Form", "FormField", "Editor", "Chart"],
    },
  },

  css: ["primeicons/primeicons.css", "~/assets/css/main.css"],
  fonts: {
    providers: {
      adobe: false,
    },
  },
});
