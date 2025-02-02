import { Result } from "./result";

export class FailedResult extends Result {
  public constructor(error: any = {}) {
    super({}, false, error);
  }
}
