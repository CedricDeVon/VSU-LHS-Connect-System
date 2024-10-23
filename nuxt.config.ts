import { Configuration } from './library/utilities/configuration'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    'nuxt-vuefire',
    "@samk-dev/nuxt-vcalendar",
  ],

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: "light",
  },

  typescript: { shim: false },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }],
  },

  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: Configuration.getEnvironmentVariable('NUXT_PUBLIC_API_KEY'),
      authDomain: Configuration.getEnvironmentVariable('NUXT_PUBLIC_AUTH_DOMAIN'),
      projectId: Configuration.getEnvironmentVariable('NUXT_PUBLIC_PROJECT_ID'),
      storageBucket: Configuration.getEnvironmentVariable('NUXT_PUBLIC_STORAGE_BUCKET'),
      messagingSenderId: Configuration.getEnvironmentVariable('NUXT_PUBLIC_MESSAGING_SENDER_ID'),
      appId: Configuration.getEnvironmentVariable('NUXT_PUBLIC_APP_ID'),
      measurementId: Configuration.getEnvironmentVariable('NUXT_PUBLIC_MEASUREMENT_ID'),
    },
  },

  build: {
    transpile: ["vue-sonner"]
  },

  app: {
    head: {
      script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js",
        defer: true
      }, {
        src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
        defer: true
      }]
    }
  },

  runtimeConfig: {
    privateKey: "private",
    public: {
      publicKey: "public"
    }
  }
});
