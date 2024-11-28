import validator from "validator";

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class SectionIdValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            if (typeof value !== 'string') {
                throw new Error(`Section IDs must be of type string`);
            }

            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
