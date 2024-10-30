import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FailedResult } from "../results/failedResult";
import { ConfigurationReader } from "./configurationReader";

export class NuxtConfigurationReader extends ConfigurationReader {
    public getPublicValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at NuxtConfigurationReader.getPublicValue(): Argument '${key}' must be a string`);
        }    

        const value: string = `${useRuntimeConfig().public[key]}`;
        return (value !== '') ? new SuccessfulResult(value) : new FailedResult(`Error found at NuxtConfigurationReader.getPublicValue(): Nuxt configuration variable '${key}' does not exist`);
    }

    public getPrivateValue(key: string): Result {
        if (typeof key !== 'string') {
            return new FailedResult(`Error found at NuxtConfigurationReader.getPrivateValue(): Argument '${key}' must be a string`);
        }
    
        const value: string = `${useRuntimeConfig()[key]}`;
        return (value !== '') ? new SuccessfulResult(value) : new FailedResult(`Error found at NuxtConfigurationReader.getPrivateValue(): Nuxt configuration variable '${key}' does not exist`);
    }

    public isEnvironmentName(value: string): boolean {
        return this.ENVIRONMENT_NAME == value;
    }

    public get isEnvironmentNameProduction(): boolean {
        return this.isEnvironmentName('production');
    }

    public get isEnvironmentNameNotProduction(): boolean {
        return !this.isEnvironmentNameProduction;
    }

    public get isEnvironmentNameDevelopment(): boolean {
        return this.isEnvironmentName('development');
    }

    public get isEnvironmentNameNotDevelopment(): boolean {
        return !this.isEnvironmentNameDevelopment;
    }

    public get isEnvironmentNameTesting(): boolean {
        return this.isEnvironmentName('testing');
    }

    public get isEnvironmentNameNotTesting(): boolean {
        return !this.isEnvironmentNameTesting;
    }

    public get CRYPTOGRAPHY_KEY(): string {
        const result: Result = this.getPrivateValue('cryptographyKey');
        this._throwErrorIfResultIsUnsuccessful(result);

        return result.data;
    }

    public get CRYPTOGRAPHY_NONCE(): string {
        const result: Result = this.getPrivateValue('cryptographyNonce');
        this._throwErrorIfResultIsUnsuccessful(result);
        
        return result.data;
    }

    public get FIREBASE_STORAGE_URL(): string {
        const result: Result = this.getPrivateValue('firebaseStorageUrl');
        this._throwErrorIfResultIsUnsuccessful(result);

        return result.data;
    }

    public get ENVIRONMENT_NAME(): string {
        const result: Result = this.getPublicValue('environmentName');
        this._throwErrorIfResultIsUnsuccessful(result);
        
        return result.data;
    }

    public get IS_CONSOLE_LOGGING_ENABLED(): boolean {
        const result: Result = this.getPublicValue('isConsoleLoggingEnabled');
        this._throwErrorIfResultIsUnsuccessful(result);
        
        return result.data === 'true';
    }

    public get IS_FILE_LOGGING_ENABLED(): boolean {
        const result: Result = this.getPublicValue('isFileLoggingEnabled');
        this._throwErrorIfResultIsUnsuccessful(result);
        
        return result.data === 'true';
    }

    private _throwErrorIfResultIsUnsuccessful(result: Result): void {
        if (result.isNotSuccessful) {
            throw new Error(result.message);
        }
    }
} 
