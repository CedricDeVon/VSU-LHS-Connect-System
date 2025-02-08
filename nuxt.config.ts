// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@nuxtjs/supabase',
    'shadcn-nuxt',
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
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
    supabaseSchema1: process.env.SUPABASE_SCHEMA_1,
    jsonWebTokenPrivateKey: process.env.JSONWEBTOKEN_PRIVATE_KEY,
    jsonWebTokenDurationInSeconds: process.env.JSONWEBTOKEN_DURATION_IN_SECONDS,
    debugAdminJsonWebToken: process.env.DEBUG_ADMIN_JSONWEBTOKEN,
    debugAdviserJsonWebToken: process.env.DEBUG_ADVISER_JSONWEBTOKEN,
    public: {
      emailServiceId: process.env.EMAIL_SERVICE_ID,
      emailTemplateId: process.env.EMAIL_TEMPLATE_ID,
      emailPublicKey: process.env.EMAIL_PUBLIC_KEY,
      testPublicConfiguration: 'testPublicConfiguration',
      isConsoleLoggingEnabled: process.env.IS_CONSOLE_LOGGING_ENABLED
    },
    testPrivateConfiguration: 'testPrivateConfiguration'
  },
})