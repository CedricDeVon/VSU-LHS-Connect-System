import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class PasswordValidator extends Validator {
    public static readonly lessThanMinimumLengthPattern: RegExp = /^.{0,7}$/;;

    public static readonly noNumberPattern: RegExp = /^(?!.*\d).*$/;

    public static readonly noSymbolPattern: RegExp = /^(?!.*[!@#$%^&*(),.?":{}|<>]).*$/;

    public static readonly hasWhitespacePattern: RegExp = /.*\s.*/;

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        if (PasswordValidator.lessThanMinimumLengthPattern.test(value)) {
            return new FailedResult(`Passwords must contain at least 8 characters`);

        } else if (PasswordValidator.noNumberPattern.test(value)) {
            return new FailedResult(`Passwords must contain at least 1 number`);

        } else if (PasswordValidator.noSymbolPattern.test(value)) {
            return new FailedResult(`Passwords must contain at least 1 symbol`);

        } else if (PasswordValidator.hasWhitespacePattern.test(value)) {
            return new FailedResult(`Passwords must not contain spaces`);
        }

        return new SuccessfulResult();
    }
}
