import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { bytesToHex, bytesToUtf8, hexToBytes, utf8ToBytes } from "@noble/ciphers/utils";

import { ICipherCryptographyLayer } from "./iCipherCryptographyLayer";
import { NuxtConfigurationReader } from "../../../configurationReaders/nuxtConfigurationReader";

export class XChaCha20Poly1305CipherCryptographyLayer implements ICipherCryptographyLayer {
  private static configurations = xchacha20poly1305(
    utf8ToBytes(NuxtConfigurationReader.CRYPTOGRAPHY_KEY),
    utf8ToBytes(NuxtConfigurationReader.CRYPTOGRAPHY_NONCE)
  );

  public wrap(plainText: string): string {
    return bytesToHex(XChaCha20Poly1305CipherCryptographyLayer.configurations.encrypt(utf8ToBytes(plainText)));
  }

  public unwrap(cipherText: string): string {
    return bytesToUtf8(XChaCha20Poly1305CipherCryptographyLayer.configurations.decrypt(hexToBytes(cipherText)));
  }
}
