import { Result } from "../results/result";

export abstract class Validator {
  public abstract validate(value: any): Result;
}
