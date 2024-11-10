import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { Databases } from "../databases/databases";
import { SuccessfulResult } from "../results/successfulResult";

export class UserExistenceValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            const result: Result = await Databases.getOneUserViaEmail(value);
            if (result.data === undefined) {
                throw new Error("User Does Not Exist");
            }
            return new SuccessfulResult(result.data, "User Already Exists");

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
