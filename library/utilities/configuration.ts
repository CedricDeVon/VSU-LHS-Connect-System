
export class Configuration {
    public static getEnvironmentVariable(key: string): string | undefined {
        const environemntVariable: string | undefined = process.env[key];
        if (typeof environemntVariable === undefined) {
            throw new Error("Configuration.getEnvironmentVariable(): Invalid 'keyName'");
        }
        return environemntVariable;
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
        return this.getEnvironmentVariable('ENVIRONMENT_NAME') == value;
    }
} 
