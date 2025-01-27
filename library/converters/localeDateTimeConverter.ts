import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { Converter } from "./converter";

export class LocaleDateTimeConverter extends Converter {
    public convert(value: string | number | Date): Result {
        try {
            const date = new Date(value);
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult();
            }
            
            return new SuccessfulResult(new Date(value).toLocaleDateString());

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
