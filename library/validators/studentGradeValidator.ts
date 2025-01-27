import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class StudentGradeValidator extends Validator {
    public constructor() {
        super();
    }

    public async validate(value: number): Promise<Result> {
        if (value === undefined || value === null) {
            return new FailedResult(`Arguments must neither be undefined or null`);
        }

        return (0 < value && value < 13) ? new SuccessfulResult() : new FailedResult(`Student grades must be in-between 1 to 12`);
    }
}
