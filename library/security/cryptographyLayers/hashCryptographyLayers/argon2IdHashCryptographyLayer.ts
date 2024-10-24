import { argon2id } from "@noble/hashes/argon2";
import { bytesToHex } from "@noble/hashes/utils";
import { NuxtConfigurationReader } from "~/library/configurationReaders/nuxtConfigurationReader";

import { IHashCryptographyLayer } from "./iHashCryptographyLayer";

export class Argon2IdHashCryptographyLayer implements IHashCryptographyLayer {
  private static configurations = { t: 2, m: 65536, p: 1 };

  public wrap(plainText: string): string {
    return bytesToHex(
      argon2id(
        plainText,
        NuxtConfigurationReader.CRYPTOGRAPHY_KEY,
        Argon2IdHashCryptographyLayer.configurations
      )
    );
  }

  public unwrap(plainText: string, hashText: string): boolean {
    return this.wrap(plainText) === hashText;
  }
}
