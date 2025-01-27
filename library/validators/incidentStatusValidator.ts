import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class IncidentStatusValidator extends Validator {
    private static readonly _validOptions: Set<string> = new Set<string>(['resolved', 'unresolved']);

    public static get validOptions(): Array<string> {
        return [...IncidentStatusValidator._validOptions];
    }

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null) {
            return new FailedResult(`Arguments must neither be undefined nor null`);
        }

        return (IncidentStatusValidator._validOptions.has(value)) ? new SuccessfulResult() : new FailedResult(`'${value}' is not a valid gender type`);
    }
}
