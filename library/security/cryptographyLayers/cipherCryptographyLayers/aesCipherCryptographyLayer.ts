import { gcm } from "@noble/ciphers/aes";
import { bytesToHex, bytesToUtf8, hexToBytes, utf8ToBytes } from "@noble/ciphers/utils";

import { ICipherCryptographyLayer } from "./iCipherCryptographyLayer";
import { NuxtConfigurationReader } from "../../../configurationReaders/nuxtConfigurationReader";

export class AesCipherCryptographyLayer implements ICipherCryptographyLayer {
  private static configurations = gcm(
    utf8ToBytes(NuxtConfigurationReader.CRYPTOGRAPHY_KEY),
    utf8ToBytes(NuxtConfigurationReader.CRYPTOGRAPHY_NONCE)
  );

  public wrap(plainText: string): string {
    return bytesToHex(AesCipherCryptographyLayer.configurations.encrypt(utf8ToBytes(plainText)));
  }

  public unwrap(cipherText: string): string {
    return bytesToUtf8(AesCipherCryptographyLayer.configurations.decrypt(hexToBytes(cipherText)));
  }
}
