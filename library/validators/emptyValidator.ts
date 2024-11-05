import { Validator } from "./validator";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";

export class EmptyValidator extends Validator {
  public async validate(value: any): Promise<Result> {
    return new SuccessfulResult(value);
  }
}
