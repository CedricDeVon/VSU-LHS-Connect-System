import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { Converter } from "./converter";

export class LocaleTimeConverter extends Converter {
    public convert(value: string | number | Date): Result {
        try {
            const date = new Date(value);
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult(date.toString());
            }
            
            return new SuccessfulResult(new Date(value).toLocaleTimeString());

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
