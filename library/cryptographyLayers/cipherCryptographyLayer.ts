import { Result } from '../results/result'
import { CryptographyLayer } from "./cryptographyLayer";
export abstract class CipherCryptographyLayer extends CryptographyLayer {
  public abstract unwrap(value: string): Promise<Result>;
}
