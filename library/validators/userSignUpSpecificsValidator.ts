import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Databases } from "../databases/databases";
import { Validator } from "./validator";

export class UserSignUpSpecificsValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { firstName, middleName, lastName, suffix, birthdate, facultyId, gradeLevel, sectionName } = value;
            return new SuccessfulResult(value);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
