import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validator } from "./validator";

export class ConfirmPasswordValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        const { password, confirmPassword } = value;
        const result: boolean = password === confirmPassword;
        return (result) ? new SuccessfulResult(result) : new FailedResult('Both passwords do not match');
    }
}
