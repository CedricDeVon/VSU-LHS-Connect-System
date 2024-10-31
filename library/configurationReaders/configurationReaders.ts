import { EnvironmentConfigurationReader } from "./environmentConfigurationReader";
import { NuxtConfigurationReader } from "./nuxtConfigurationReader";

export class ConfigurationReaders {
    private static readonly _environmentConfigurationReader: EnvironmentConfigurationReader = new EnvironmentConfigurationReader();

    private static readonly _nuxtConfigurationReader: NuxtConfigurationReader = new NuxtConfigurationReader();

    public static get environmentConfigurationReader(): EnvironmentConfigurationReader {
        return this._environmentConfigurationReader;
    }

    public static get nuxtConfigurationReader(): NuxtConfigurationReader {
        return this._nuxtConfigurationReader;
    }
}

