import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FailedResult } from "../results/failedResult";
import { ConfigurationReader } from "./configurationReader";

export class EnvironmentConfigurationReader extends ConfigurationReader {
    public getValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at EnvironmentConfigurationReader.getValue(): Argument '${key}' must be a string`);
        }

        const value: string = (typeof process.env[key] !== undefined) ? `${process.env[key]}` : '';
        return (value !== '') ? new SuccessfulResult(value) : new FailedResult(`Error found at EnvironmentConfigurationReader.getValue(): Environment variable '${key}' does not exist`);
    }

    public getValueDirectly(key: string): string {
        const result: Result = this.getValue(key);
        if (result.isNotSuccessful) {
            throw new Error(result.message);
        }

        return result.data;
    }
} 
