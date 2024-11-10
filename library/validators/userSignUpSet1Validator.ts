import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Validator } from "./validator";

export class UserSignUpSet1Validator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { userName, email, password, confirmPassword } = value;
            let result: Result = await Validators.userNameValidator.validate(userName);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.emailValidator.validate(email);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.userExistenceValidator.validate(email);
            if (result.isSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.passwordValidator.validate(password);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.confirmPasswordValidator.validate({ password, confirmPassword });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
