import { NuxtConfigurationReader } from "./nuxtConfigurationReader";
import { EnvironmentConfigurationReader } from "./environmentConfigurationReader";

export class ConfigurationReaders {
    public static readonly environmentConfigurationReader: EnvironmentConfigurationReader = new EnvironmentConfigurationReader();

    public static readonly nuxtConfigurationReader: NuxtConfigurationReader = new NuxtConfigurationReader();
}

