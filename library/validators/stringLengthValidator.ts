import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class StringLengthValidator extends Validator {
    private _minimumLength: number;

    private _maximumLength: number;

    public constructor(minimumLength: number = 0, maximumLength: number = 0) {
        super();

        this._minimumLength = minimumLength;
        this._maximumLength = maximumLength;
    }

  public async validate(value: any): Promise<Result> {
    try {
      if (value.length < this._minimumLength) {
        throw new Error(`String value must contain at least '${this._minimumLength}' characters`);
      }
      if (value.length > this._maximumLength) {
        throw new Error(`String value must contain at most '${this._maximumLength}' characters`);
      }
      return new SuccessfulResult(value);

    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
