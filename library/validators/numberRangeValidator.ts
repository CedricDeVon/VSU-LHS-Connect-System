import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class NumberRangeValidator extends Validator {
  private readonly _configurations: any;

  public constructor(minimum: number, maximum: number) {
    super();

    this._configurations = {
      min: minimum,
      max: maximum
    };
  }

  public get configurations(): any {
    return { ...this._configurations };
  }

  public async validate(value: any): Promise<Result> {
    return (validator.isNumeric(value, this._configurations)) ?
      new SuccessfulResult(value) :
      new FailedResult(`'${value}' must be greater than or equal to '${this._configurations.min}' and less than or equal to '${this._configurations.max}'`);
  }
}
