import { Validator } from "./validator";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";

export class EmptyValidator extends Validator {
  public validate(value: any): Result {
    return new SuccessfulResult(value);
  }
}
