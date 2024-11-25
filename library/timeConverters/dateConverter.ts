import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { TimeConverter } from "./timeConverter";

export class DateConverter extends TimeConverter {
    private static _months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    public static get months(): string[] {
        return [...DateConverter._months];
    }

    public convert(value: string | number): Result {
        const date = new Date(value);
        try {
            return new SuccessfulResult(`${DateConverter._months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
