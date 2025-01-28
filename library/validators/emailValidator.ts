import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class EmailValidator extends Validator {
    private static readonly _pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    public static get pattern(): RegExp {
        return EmailValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        return (EmailValidator._pattern.test(value)) ? new SuccessfulResult() : new FailedResult('Invalid email format');
    }
}
