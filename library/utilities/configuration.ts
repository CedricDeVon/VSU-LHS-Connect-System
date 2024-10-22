
export class Configuration {
    public static get(key: string): string | undefined {
        const value: string | undefined = process.env[key];
        if (typeof value === undefined) {
            throw new Error("Invalid Env");
        }
        return value;
    }
} 
