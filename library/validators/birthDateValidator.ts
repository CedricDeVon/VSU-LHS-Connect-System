import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class BirthDateValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    return (validator.isDate(value)) ?
      new SuccessfulResult(value) :
      new FailedResult(`'${value}' is not a valid date type`);
  }
}
