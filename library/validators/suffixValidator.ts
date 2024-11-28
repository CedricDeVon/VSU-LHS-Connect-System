import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class SuffixValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    try {
        console.log(value)
        if (typeof value !== 'string') {
            throw new Error(`Suffixes must be of type string`);
        }

        return new SuccessfulResult(value);

    } catch (error: any) {
        return new FailedResult(error.message);
    }
  }
}
