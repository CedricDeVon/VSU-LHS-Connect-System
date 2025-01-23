import { ConfigurationReaders } from "./library/configurationReaders/configurationReaders";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "@samk-dev/nuxt-vcalendar",
    "nuxt-file-storage",
    "@nuxt/image",
    "@pinia/nuxt"
  ],
  
  fileStorage: {
    // enter the absolute path to the location of your storage
    mount: '/files',
  },

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "light",
  },

  typescript: { shim: false },

  imports: {
    imports: [
      {
        from: "tailwind-variants",
        name: "tv",
      },
      {
        from: "tailwind-variants",
        name: "VariantProps",
        type: true,
      },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  build: {
    transpile: ["vue-sonner"],
  },

  app: {
    head: {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  runtimeConfig: {
    cryptographyKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_CRYPTOGRAPHY_KEY"),
    cryptographyNonce: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_CRYPTOGRAPHY_NONCE"),
    emailServiceId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_SERVICE_ID"),
    emailTemplateId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_TEMPLATE_ID"),
    emailTemplateIdForApproval: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_TEMPLATE2_ID"),
    emailPublicKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_PUBLIC_KEY"),
    supabaseUrl: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_SUPABASE_URL"),
    supabaseApiKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_SUPABASE_API_KEY"),
    userTokenDurationInSeconds: 60,
    public: {
      environmentName: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_ENVIRONMENT_NAME"),
      isConsoleLoggingEnabled: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_IS_CONSOLE_LOGGING_ENABLED"),
      isFileLoggingEnabled: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_IS_FILE_LOGGING_ENABLED"),
    }
  },

  image: {
    // Options
  }
});