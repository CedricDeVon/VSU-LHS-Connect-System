import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { HashCryptographyLayer } from "./hashCryptographyLayer";

export class EmptyHashCryptographyLayer extends HashCryptographyLayer {
  public async wrap(plainText: string): Promise<Result> {
    return new SuccessfulResult(plainText);
  }

  public async unwrap(plainText: string, hashText: string): Promise<Result> {
    return new SuccessfulResult(true);
  }
}
