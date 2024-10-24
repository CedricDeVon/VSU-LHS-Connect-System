import { IHashCryptographyLayer } from "./iHashCryptographyLayer";

export class EmptyHashCryptographyLayer implements IHashCryptographyLayer {
  public wrap(plainText: string): string {
    return plainText;
  }

  public unwrap(plainText: string, hashText: string): boolean {
    return true;
  }
}
