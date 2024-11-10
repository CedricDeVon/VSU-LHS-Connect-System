import { Validator } from "./validator";
import { Validators } from "./validators";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class UserSignUpSpecificsValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { firstName, middleName, lastName, birthDate, facultyId } = value;
            let result: Result = await Validators.personNameValidator.validate(firstName);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.personNameValidator.validate(middleName);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.personNameValidator.validate(lastName);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.birthDateValidator.validate(birthDate);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            result = await Validators.vsuIssuedIdValidator.validate(facultyId);
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
