import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { Converter } from "./converter";

export class DateConverter extends Converter {
    private static _months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    public static get months(): string[] {
        return [...DateConverter._months];
    }

    public convert(value: string | number): Result {
        try {
            const date = new Date(value);
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult();
            }
            
            const month = DateConverter._months[date.getUTCMonth()];
            const day = date.getUTCDate();
            const year = date.getUTCFullYear();
    
            return new SuccessfulResult(`${month} ${day}, ${year}`);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
