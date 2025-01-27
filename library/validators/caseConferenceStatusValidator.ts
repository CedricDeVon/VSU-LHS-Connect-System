import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class CaseConferenceStatusValidator extends Validator {
    private static readonly _validOptions: Set<string> = new Set<string>(['complete', 'pending']);

    public static get validOptions(): Array<string> {
        return [...CaseConferenceStatusValidator._validOptions];
    }

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null) {
            return new FailedResult(`Arguments must neither be undefined nor null`);
        }

        return (CaseConferenceStatusValidator._validOptions.has(value)) ? new SuccessfulResult() : new FailedResult(`'${value}' is not a valid gender type`);
    }
}
