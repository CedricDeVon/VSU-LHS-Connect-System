// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  runtimeConfig: {
    public: {
      serviceId: process.env.NUXT_PUBLIC_SERVICE_ID,
      templateId: process.env.NUXT_PUBLIC_TEMPLATE_ID,
      publicKey: process.env.NUXT_PUBLIC_PUBLIC_KEY,
    },
  },

})