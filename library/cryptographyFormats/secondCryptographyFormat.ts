import { Result } from "../results/result";
import { CryptographyFormat } from "./cryptographyFormat";
import { AesCipherCryptographyLayer } from "../cryptographyLayers/aesCipherCryptographyLayer";
import { XChaCha20Poly1305CipherCryptographyLayer } from "../cryptographyLayers/xChaCha20Poly1305CipherCryptographyLayer";

export class SecondCryptographyFormat extends CryptographyFormat {
  public constructor() {
    super([new XChaCha20Poly1305CipherCryptographyLayer(), new AesCipherCryptographyLayer()]);
  }

  public async unwrap(hashText: string): Promise<Result> {
    return await this.decryptLayers(hashText);
  }
}
