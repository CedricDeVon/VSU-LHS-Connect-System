import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class PersonNameValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    try {
      if (value.length < 1) {
        throw new Error(`Names must contain at least '1' character`);
      }
      if (value.length > 128) {
        throw new Error(`Names must contain at most '128' characters`);
      }
      return new SuccessfulResult(value);

    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
