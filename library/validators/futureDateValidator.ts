import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class FutureDateValidator extends Validator {
    public constructor() {
        super();
    }

    public async validate(value: string | number | Date): Promise<Result> {
        if (value === undefined || value === null ||
            (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date))) {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        return (new Date() < new Date(value)) ? new SuccessfulResult() : new FailedResult('Value is not a valid future date');
    }
}
