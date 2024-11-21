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
    "nuxt-vuefire",
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

  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_API_KEY"),
      authDomain: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_AUTH_DOMAIN"),
      projectId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_PROJECT_ID"),
      storageBucket: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_STORAGE_BUCKET"),
      messagingSenderId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_MESSAGING_SENDER_ID"),
      appId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_APP_ID"),
      measurementId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_PUBLIC_MEASUREMENT_ID"),
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
    cryptographyKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_CRYPTOGRAPHY_KEY"),
    cryptographyNonce: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_CRYPTOGRAPHY_NONCE"),
    firebaseStorageUrl: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_FIREBASE_STORAGE_URL"),
    emailServiceId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_SERVICE_ID"),
    emailTemplateId: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_TEMPLATE_ID"),
    emailTemplateIdForApproval: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_TEMPLATE2_ID"),
    emailPublicKey: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_EMAIL_PUBLIC_KEY"),
    userTokenDurationInSeconds: 3600,
    public: {
      environmentName: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_ENVIRONMENT_NAME"),
      isConsoleLoggingEnabled: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_IS_CONSOLE_LOGGING_ENABLED"),
      isFileLoggingEnabled: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_IS_FILE_LOGGING_ENABLED"),
      debugAdminEmail: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_DEBUG_ADMIN_EMAIL"),
      debugAdminPassword: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_DEBUG_ADMIN_PASSWORD"),
      debugAdviserEmail: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_DEBUG_ADVISER_EMAIL"),
      debugAdviserPassword: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_DEBUG_ADVISER_PASSWORD"),
      signUpTemporaryPassword: ConfigurationReaders.environmentConfigurationReader.getValueDirectly("NUXT_SIGN_UP_TEMPORARY_PASSWORD"),
    }
  },

  image: {
    // Options
  }
});