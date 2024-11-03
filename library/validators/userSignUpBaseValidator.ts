import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Databases } from "../databases/databases";

export class UserSignUpBaseValidator {
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
            result = await Databases.getUser(email);
            if (result.data !== undefined) {
                throw new Error("User Already Exists");
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
