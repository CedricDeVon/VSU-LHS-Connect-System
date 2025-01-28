import { Validator } from "./validator";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class PersonAgeValidator extends Validator {
    public constructor() {
        super();
    }
    
    public async validate(value: number): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`);
        }

        return (-1 < value && value < 129) ? new SuccessfulResult() : new FailedResult(`A human age must be in-between the ages 0 to 128`);
    }
}
