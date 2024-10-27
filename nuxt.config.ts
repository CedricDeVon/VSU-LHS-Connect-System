import { EnvironmentConfigurationReader } from "./library/configurationReaders/environmentConfigurationReader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 // components: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [  
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "nuxt-vuefire",
    "@samk-dev/nuxt-vcalendar",
  ],
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

  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_API_KEY"),
      authDomain: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_AUTH_DOMAIN"),
      projectId: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_PROJECT_ID"),
      storageBucket: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_STORAGE_BUCKET"),
      messagingSenderId: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_MESSAGING_SENDER_ID"),
      appId: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_APP_ID"),
      measurementId: EnvironmentConfigurationReader.getValue("NUXT_PUBLIC_MEASUREMENT_ID"),
    },
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
    cryptographyKey: EnvironmentConfigurationReader.getValue("NUXT_CRYPTOGRAPHY_KEY"),
    cryptographyNonce: EnvironmentConfigurationReader.getValue("NUXT_CRYPTOGRAPHY_NONCE"),
    public: {
      environmentName: EnvironmentConfigurationReader.getValue("NUXT_ENVIRONMENT_NAME"),
      isConsoleLoggingEnabled: EnvironmentConfigurationReader.getValue("NUXT_IS_CONSOLE_LOGGING_ENABLED"),
      isFileLoggingEnabled: EnvironmentConfigurationReader.getValue("NUXT_IS_FILE_LOGGING_ENABLED"),
      serviceId: process.env.NUXT_PUBLIC_SERVICE_ID,
      templateId: process.env.NUXT_PUBLIC_TEMPLATE_ID,
      publicKey: process.env.NUXT_PUBLIC_PUBLIC_KEY,
    },
  },



});




 