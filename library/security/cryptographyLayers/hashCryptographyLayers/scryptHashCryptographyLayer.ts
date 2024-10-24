import { scrypt } from "@noble/hashes/scrypt";
import { bytesToHex } from "@noble/hashes/utils";

import { IHashCryptographyLayer } from "./iHashCryptographyLayer";
import { NuxtConfigurationReader } from "~/library/configurationReaders/nuxtConfigurationReader";

export class ScryptHashCryptographyLayer implements IHashCryptographyLayer {
  private static configurations = { N: 2 ** 16, r: 8, p: 1, dkLen: 32 };

  public wrap(plainText: string): string {
    return bytesToHex(
      scrypt(
        plainText,
        NuxtConfigurationReader.CRYPTOGRAPHY_KEY,
        ScryptHashCryptographyLayer.configurations
      )
    );
  }

  public unwrap(plainText: string, hashText: string): boolean {
    return this.wrap(plainText) === hashText;
  }
}
