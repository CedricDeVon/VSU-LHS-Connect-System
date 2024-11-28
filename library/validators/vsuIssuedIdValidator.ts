import validator from "validator";

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class VSUIssuedIdValidator extends Validator {
    public async validate(value: any): Promise<Result> {
        try {
            // console.log(value);
            if (typeof value !== 'string') {
                throw new Error(`VSU IDs must be of type string`);
            }

            let temporary: Array<string> = value.split('-');
            if (temporary.length != 3 ||
                temporary[0].length != 2 ||
                temporary[1].length != 1 ||
                temporary[2].length != 5 ||
                !validator.isNumeric(temporary[0]) ||
                !validator.isNumeric(temporary[1]) ||
                !validator.isNumeric(temporary[2]))  {
                throw new Error(`VSU IDs must follow this format: 00-0-00000`);
            }

            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
