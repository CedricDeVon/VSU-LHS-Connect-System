import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class PhoneNumberValidator extends Validator {
    private static readonly _pattern: RegExp = /^\+?[0-9]{7,15}$/;

    public static get pattern(): RegExp {
        return PhoneNumberValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Arguments must be of type string`);
        }

        return (PhoneNumberValidator._pattern.test(value)) ? new SuccessfulResult() : new FailedResult('Invalid phone number format');
    }
}
