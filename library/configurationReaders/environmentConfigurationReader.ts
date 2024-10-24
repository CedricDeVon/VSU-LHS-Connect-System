
export class EnvironmentConfigurationReader {
    public static getValue(key: string): string {
        if (typeof key !== 'string') {
            throw new Error('Not a string');
        }

        const value: string = (typeof process.env[key] !== undefined) ? `${process.env[key]}` : '';
        if (value === '') {
            throw new Error(`EnvironmentConfigurationReader.getValue(): Variable '${key}' does not exist`);
        }
        return value;
    }
} 
