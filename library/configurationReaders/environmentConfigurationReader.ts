import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { ConfigurationReader } from "./configurationReader";

export class EnvironmentConfigurationReader extends ConfigurationReader {
    public getValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at EnvironmentConfigurationReader.getValue(): Argument '${key}' must be a string`);
        }

        const value: string = (process.env[key] !== undefined) ? `${process.env[key]}` : '';
        return (value !== '') ? new SuccessfulResult(value) : new FailedResult(`Error found at EnvironmentConfigurationReader.getValue(): Environment variable '${key}' does not exist`);
    }
} 
