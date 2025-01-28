import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class PersonNameValidator extends Validator {
    private static readonly _pattern: RegExp = /^[a-zA-Z\s'-]{2,255}$/

    public static get pattern(): RegExp {
        return PersonNameValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        return (PersonNameValidator._pattern.test(value)) ? new SuccessfulResult() : new FailedResult('Invalid person name format');
    }
}
