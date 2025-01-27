import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class GenderValidator extends Validator {
    private static readonly _validOptions: Set<string> = new Set<string>(['male', 'female', 'others']);

    public static get validOptions(): Array<string> {
        return [...GenderValidator._validOptions];
    }

    public constructor() {
        super();
    }

    public async validate(value: any): Promise<Result> {
        if (value === undefined || value === null) {
            return new FailedResult(`Arguments must neither be undefined or null`);
        }

        return (GenderValidator._validOptions.has(value)) ? new SuccessfulResult() : new FailedResult(`'${value}' is not a valid gender type`);
    }
}
