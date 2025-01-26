import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { ConfigurationReader } from "./configurationReader";

export class NuxtConfigurationReader extends ConfigurationReader {
    public getPublicRuntimeConfigValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at NuxtConfigurationReader.getPublicValue(): Argument '${key}' must be a string`);
        }    

        const value: any = useRuntimeConfig().public[key];
        return (value !== undefined) ? new SuccessfulResult(`${value}`) : new FailedResult(`Error found at NuxtConfigurationReader.getPublicValue(): Nuxt configuration variable '${key}' does not exist`);
    }

    public getPrivateRuntimeConfigValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at NuxtConfigurationReader.getPrivateValue(): Argument '${key}' must be a string`);
        }
    
        const value: any = useRuntimeConfig()[key];
        return (value !== undefined) ? new SuccessfulResult(`${value}`) : new FailedResult(`Error found at NuxtConfigurationReader.getPrivateValue(): Nuxt configuration variable '${key}' does not exist`);
    }
} 
