import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { TimeConverter } from "./timeConverter";

export class DateTimeConverter extends TimeConverter {
    public convert(value: string | number): Result {
        try {
            return new SuccessfulResult(new Date(value).toDateString());

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
