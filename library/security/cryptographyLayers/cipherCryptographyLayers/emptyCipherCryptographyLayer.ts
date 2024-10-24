import { ICipherCryptographyLayer } from "./iCipherCryptographyLayer";

export class EmptyCipherCryptographyLayer implements ICipherCryptographyLayer {
  public wrap(plainText: string): string {
    return plainText;
  }

  public unwrap(plainText: string): string {
    return plainText;
  }
}
