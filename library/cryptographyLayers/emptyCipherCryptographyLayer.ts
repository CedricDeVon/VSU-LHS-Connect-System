import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { CipherCryptographyLayer } from "./cipherCryptographyLayer";

export class EmptyCipherCryptographyLayer extends CipherCryptographyLayer {
  public async wrap(plainText: string): Promise<Result> {
    return new SuccessfulResult(plainText);
  }

  public async unwrap(plainText: string): Promise<Result> {
    return new SuccessfulResult(plainText);
  }
}
