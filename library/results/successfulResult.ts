import { Result } from "./result";

export class SuccessfulResult extends Result {
  public constructor(data: any = undefined, message: string = "") {
    super(data, true, message);
  }
}
