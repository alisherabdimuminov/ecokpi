// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxtjs/color-mode'
    ],

    colorMode: {
        classSuffix: "",
        classPrefix: "",
    },

    runtimeConfig: {
        public: {
            // Development
            // base: "http://localhost:8000",
            // api: "http://localhost:8000/api/v1",

            // Production
            base: "http://kpi.pythonanywhere.com",
            api: "http://kpi.pythonanywhere.com/api/v1",
        }
    }
});
