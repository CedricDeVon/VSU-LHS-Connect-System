import { Result } from "./result";

export class SuccessfulResult extends Result {
  public constructor(data: any = undefined, error: any = {}) {
    super(data, true, error);
  }
}
