import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class InitialIncidentStatusValidator extends Validator {
    private static readonly _validOptions: Set<string> = new Set<string>(['read', 'unread']);

    public static get validOptions(): Array<string> {
        return [...InitialIncidentStatusValidator._validOptions];
    }

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        return (InitialIncidentStatusValidator._validOptions.has(value)) ? new SuccessfulResult() : new FailedResult(`'${value}' is neither of these valid types: '${InitialIncidentStatusValidator._validOptions}'`);
    }
}
