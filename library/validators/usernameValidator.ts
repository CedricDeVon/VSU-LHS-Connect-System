import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class UsernameValidator extends Validator {    
    public static readonly hasWhitespacePattern: RegExp = /.*\s.*/;

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        if (value.length < 8) {
            return new FailedResult('Usernames must contain at least 8 characters');
        
        } else if (UsernameValidator.hasWhitespacePattern.test(value)) {
            return new FailedResult(`Usernames must not contain spaces`);
        }

        return new SuccessfulResult();
    }
}
