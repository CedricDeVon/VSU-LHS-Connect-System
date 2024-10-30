import { Result } from "../results/result";
import { CryptographyLayer } from "./cryptographyLayer";

export abstract class HashCryptographyLayer extends CryptographyLayer {
  public abstract unwrap(plainText: string, hashText: string): Promise<Result>;
}
