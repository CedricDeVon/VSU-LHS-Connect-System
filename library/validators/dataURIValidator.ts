import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class DataURIValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    return (validator.isDataURI(value)) ?
      new SuccessfulResult(value) :
      new FailedResult(`'${value}' is not a valid data URI`);
  }
}
