import { createClient } from "@supabase/supabase-js";

import { ConfigurationReaders } from "~/library/configurationReaders/configurationReaders";

export const supabase = createClient(
    ConfigurationReaders.nuxtConfigurationReader.NUXT_SUPABASE_URL,
    ConfigurationReaders.nuxtConfigurationReader.NUXT_SUPABASE_API_KEY
);
