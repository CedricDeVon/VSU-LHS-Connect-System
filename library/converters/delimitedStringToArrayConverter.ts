import { Converter } from "./converter";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class DelimitedStringToArrayConverter extends Converter {
    public convert(data: { value: string, delimeter: string }): Result {
        try {
            const { value, delimeter } = data;
            if (data === undefined || data === null ||
                value === undefined || value === null ||
                delimeter === undefined || delimeter === null) {
                throw new Error('Arguments must neither be undefined nor null');
            }

            return new SuccessfulResult(data.value.split(data.delimeter));

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
