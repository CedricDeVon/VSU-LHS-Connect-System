import validator from 'validator';

import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from "../results/successfulResult";

export class PasswordValidator extends Validator {
  private readonly _configurations: any;

  public constructor(
    minimumLength: number = 8,
    maximumLength: number = 24,
    minimumNumberCount: number = 1,
    minimumSymbolCount: number = 1,
    minimumLowercaseCount: number = 1,
    minimumUppercaseCount: number = 1,) {
    super();

    this._configurations = {
      minLength: minimumLength,
      maxLength: maximumLength,
      minNumbers: minimumNumberCount,
      minSymbols: minimumSymbolCount,
      minLowercase: minimumLowercaseCount,
      minUppercase: minimumUppercaseCount
    };
  }

  public async validate(value: any): Promise<Result> {
    if (typeof value !== 'string') {
      return new FailedResult(`'${value}' must be a string`);
    }

    const { minLength, maxLength, minNumbers, minSymbols, minLowercase, minUppercase } = this._configurations;
    if (value.length < minLength) {
      return new FailedResult(`Passwords must contain at least '${minLength}' character(s)`);
    }

    if (value.length > maxLength) {
      return new FailedResult(`Passwords must contain at most '${maxLength}' character(s)`);
    }

    if (!validator.isStrongPassword(value, { minNumbers })) {
      return new FailedResult(`Passwords must contain at least '${minNumbers}' number(s)`);
    }

    if (!validator.isStrongPassword(value, { minSymbols })) {
      return new FailedResult(`Passwords must contain at least '${minSymbols}' symbol(s)`);
    }

    if (!validator.isStrongPassword(value, { minLowercase })) {
      return new FailedResult(`Passwords must contain at least '${minLowercase}' lowercased character(s)`);
    }

    if (!validator.isStrongPassword(value, { minUppercase })) {
      return new FailedResult(`Passwords must contain at least '${minUppercase}' uppercased character(s)`);
    }
    
    return new SuccessfulResult(value);
  }
}
