import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { CryptographyFormats } from '../cryptographyFormats/cryptographyFormats';

export class UserPasswordHashValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { rawPassword, hashedPassword } = value;
            const result: Result = await CryptographyFormats.firstCryptographyFormat.unwrap(rawPassword, hashedPassword);
            if (result.isNotSuccessful) {
                throw new Error("User Password Does Not Match");
            }
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
