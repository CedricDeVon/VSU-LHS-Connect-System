import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Validator } from "./validator";

export class UserLoginValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { email, password } = value;
            let result: Result = await Validators.emailValidator.validate(email);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.passwordValidator.validate(password);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.userExistenceValidator.validate(email);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            const userData = result.data
            console.log(userData)

            return new SuccessfulResult(userData);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
