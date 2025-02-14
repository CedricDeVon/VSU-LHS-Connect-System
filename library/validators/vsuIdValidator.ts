import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class VsuIdValidator extends Validator {
    public static readonly pattern: RegExp = /^[0-9]{2}-[12]{1}-[0-9]{5}$/

    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        return (VsuIdValidator.pattern.test(value)) ? new SuccessfulResult() : new FailedResult('VSU-issued Ids Must Follow This Format \'00-0-00000\'');
    }
}
