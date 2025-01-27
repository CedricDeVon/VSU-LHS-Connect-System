import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class LargeTextValidator extends Validator {
    public static readonly maximumLimit: number = Math.pow(2, 32) + 1;
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Arguments must be of type string`);
        }

        return (value.length < LargeTextValidator.maximumLimit) ? new SuccessfulResult() : new FailedResult('Character limit reached');;
    }
}
