
export class NuxtConfigurationReader {
    public static getPublicValue(key: string): string {
        if (typeof key !== 'string') {
            throw new Error('Not a string');
        }    

        const value: string = `${useRuntimeConfig().public[key]}`;
        if (value === '') {
            throw new Error(`NuxtConfigurationReader.getPublicValue(): Variable '${key}' does not exist`);
        }
        return value;
    }

    public static getPrivateValue(key: string): string {
        if (typeof key !== 'string') {
            throw new Error('Not a string');
        }
    
        const value: string = `${useRuntimeConfig()[key]}`;
        if (value === '') {
            throw new Error(`NuxtConfigurationReader.getPrivateValue(): Variable '${key}' does not exist`);
        }
        return value;
    }

    public static get CRYPTOGRAPHY_KEY(): string {
        return NuxtConfigurationReader.getPrivateValue('cryptographyKey');
    }

    public static get CRYPTOGRAPHY_NONCE(): string {
        return NuxtConfigurationReader.getPrivateValue('cryptographyNonce');
    }

    public static get ENVIRONMENT_NAME(): string {
        return NuxtConfigurationReader.getPublicValue('environmentName');
    }

    public static get IS_CONSOLE_LOGGING_ENABLED(): boolean {
        return NuxtConfigurationReader.getPublicValue('isConsoleLoggingEnabled') === 'true';
    }

    public static get IS_FILE_LOGGING_ENABLED(): boolean {
        return NuxtConfigurationReader.getPublicValue('isFileLoggingEnabled') === 'true';
    }

    public static get isEnvironmentNameProduction(): boolean {
        return this.isEnvironmentName('production');
    }

    public static get isEnvironmentNameNotProduction(): boolean {
        return !this.isEnvironmentNameProduction;
    }

    public static get isEnvironmentNameDevelopment(): boolean {
        return this.isEnvironmentName('development');
    }

    public static get isEnvironmentNameNotDevelopment(): boolean {
        return !this.isEnvironmentNameDevelopment;
    }

    public static get isEnvironmentNameTesting(): boolean {
        return this.isEnvironmentName('testing');
    }

    public static get isEnvironmentNameNotTesting(): boolean {
        return !this.isEnvironmentNameTesting;
    }

    public static isEnvironmentName(value: string): boolean {
        return this.ENVIRONMENT_NAME == value;
    }
} 
