
export class Chronos {
    public static convertToISOString(dateValue: string | number): string | undefined {
        try {
            return new Date(dateValue).toISOString();

        } catch (error) {
            console.error(error);
        }
    }

    public static convertToDateString(dateValue: string | number): string | undefined {
        try {
            return new Date(dateValue).toDateString();

        } catch (error) {
            console.error(error);
        }
    }

    public static convertToLocaleDateString(dateValue: string | number): string | undefined {
        try {
            return new Date(dateValue).toLocaleDateString();

        } catch (error) {
            console.error(error);
        }
    }

    public static convertToLocaleTimeString(dateValue: string | number): string | undefined {
        try {
            return new Date(dateValue).toLocaleTimeString();

        } catch (error) {
            console.error(error);
        }
    }

    public static convertToLinuxTime(dateValue: string | number): number | undefined {
        try {
            return Date.parse(dateValue) / 1000;

        } catch (error) {
            console.error(error);
        }
    }
} 
