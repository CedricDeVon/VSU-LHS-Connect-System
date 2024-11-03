import { CryptographyFormat } from "./cryptographyFormat";
import { XChaCha20Poly1305CipherCryptographyLayer } from "../cryptographyLayers/xChaCha20Poly1305CipherCryptographyLayer";
import { Argon2IdHashCryptographyLayer } from "../cryptographyLayers/argon2IdHashCryptographyLayer";

import { Result } from "../results/result";
import { EmptyCipherCryptographyLayer } from "../cryptographyLayers/emptyCipherCryptographyLayer";

export class FirstCryptographyFormat extends CryptographyFormat {
  public constructor() {
    super([new EmptyCipherCryptographyLayer()], new Argon2IdHashCryptographyLayer());
  }

  public async unwrap(plainText: string, hashText: string): Promise<Result> {
    const result: Result = await this.decryptLayers(hashText);
    if (result.isNotSuccessful) {
        return result;
    }

    return this._hashCryptographyLayer.unwrap(plainText, result.data);
  }
}
