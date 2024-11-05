import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class UserNameValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        if (validator.isEmpty(value)) {
            return new FailedResult('Username must not be empty');
        }

        return new SuccessfulResult(value);
    }
}
