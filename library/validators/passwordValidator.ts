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

  public validate(value: any): Result {
    if (typeof value !== 'string') {
      return new FailedResult(`'${value}' must be a string`);
    }

    const { minimumLength, maximumLength, minimumNumberCount, minimumSymbolCount, minimumLowercaseCount, minimumUppercaseCount } = this._configurations;
    if (!validator.isStrongPassword(value, { minLength: minimumLength })) {
      return new FailedResult(`Passwords must contain at least '${minimumLength}' characters`);
    }

    if (value.length > maximumLength) {
      return new FailedResult(`Passwords must contain at most '${maximumLength}' characters`);
    }

    if (!validator.isStrongPassword(value, { minNumbers: minimumNumberCount })) {
      return new FailedResult(`Passwords must contain at least '${minimumNumberCount}' numbers`);
    }

    if (!validator.isStrongPassword(value, { minSymbols: minimumSymbolCount })) {
      return new FailedResult(`Passwords must contain at least '${minimumSymbolCount}' symbols`);
    }

    if (!validator.isStrongPassword(value, { minLowercase: minimumLowercaseCount })) {
      return new FailedResult(`Passwords must contain at least '${minimumLowercaseCount}' lowercased characters`);
    }

    if (!validator.isStrongPassword(value, { minUppercase: minimumUppercaseCount })) {
      return new FailedResult(`Passwords must contain at least '${minimumUppercaseCount}' uppercased characters`);
    }
    
    return new SuccessfulResult(value);
  }
}
