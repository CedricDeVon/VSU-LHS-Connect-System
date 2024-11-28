import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class GenderValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    try {
        // console.log(value);
        const temp = value.toLowerCase();    
        if (temp === 'male' || temp === 'female') {
          return new SuccessfulResult(value);
        }
        throw new Error(`Gender must either be 'male' or 'female'`);

    } catch (error: any) {
        return new FailedResult(error.message);
    }
  }
}
