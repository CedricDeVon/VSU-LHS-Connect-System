import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class PasswordValidator extends Validator {
    private static readonly _pattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    public static get pattern(): RegExp {
        return PasswordValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Arguments must be of type string`);
        }

        return (PasswordValidator._pattern.test(value)) ? new SuccessfulResult() : new FailedResult('Invalid password format');
    }
}
