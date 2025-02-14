import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class ConfirmPasswordValidator extends Validator {
    public constructor() {
        super();
    }

    public async validate(value: any): Promise<Result> {
        if (value === undefined ||
            value === null ||
            value.password === undefined ||
            value.confirmPassword === undefined) {
            return new FailedResult(`Argument(s) must be of type object with a password and confirmPassword string type properties`);
        }

        return (value.password === value.confirmPassword) ? new SuccessfulResult() : new FailedResult('Both Passwords Must Match');
    }
}
