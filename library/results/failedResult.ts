import { Result } from "./result";

export class FailedResult extends Result {
  public constructor(message: string = "") {
    super({}, false, message);
  }
}
