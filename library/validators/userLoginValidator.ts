import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Databases } from "../databases/databases";
import { CryptographyFormats } from "../cryptographyFormats/cryptographyFormats";
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
            if (result.isSuccessful) {
                throw new Error(result.message);
            }
            const userData = result.data
            result = await CryptographyFormats.firstCryptographyFormat.unwrap(password, result.data.password)
            if (result.isNotSuccessful) {
                throw new Error("User Password Does Not Match");
            }
            return new SuccessfulResult(userData);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
