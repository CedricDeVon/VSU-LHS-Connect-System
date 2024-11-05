import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";
import { Validators } from "./validators";
import { Validator } from "./validator";

export class UserSignUpSpecificsValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const { firstName, middleName, lastName, birthdate, facultyId, gradeLevel, sectionName } = value;
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
            if (birthdate === undefined || birthdate === null || birthdate === '') {
                throw new Error('Please input your birthdate');
            }
            // if (gradeLevel === undefined || gradeLevel === null || gradeLevel === '' || gradeLevel < 7 || gradeLevel > 12) {
            //     throw new Error('Please input a valid grade level');
            // }
            // if (sectionName === undefined || sectionName === null || sectionName === '') {
            //     throw new Error('Please input a valid section name');
            // }
            if (facultyId === undefined || facultyId === null || facultyId === '') {
                throw new Error('Plase input a valid faculty id');
            }
            
            return new SuccessfulResult(value);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
