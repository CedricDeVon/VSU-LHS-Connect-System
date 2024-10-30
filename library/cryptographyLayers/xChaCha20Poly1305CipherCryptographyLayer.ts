import { xchacha20poly1305 } from "@noble/ciphers/chacha";
import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/ciphers/utils";

import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FailedResult } from "../results/failedResult";
import { CipherCryptographyLayer } from "./cipherCryptographyLayer";
import { ConfigurationReaders } from "../configurationReaders/configurationReaders";

export class XChaCha20Poly1305CipherCryptographyLayer extends CipherCryptographyLayer {
  private static _configurations = xchacha20poly1305(
    utf8ToBytes(ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY),
    utf8ToBytes(ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_NONCE)
  );

  public async wrap(plainText: string): Promise<Result> {
    try {
      return new SuccessfulResult(bytesToHex(
        XChaCha20Poly1305CipherCryptographyLayer._configurations.encrypt(utf8ToBytes(plainText))
      ));

    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public async unwrap(cipherText: string): Promise<Result> {
    try {
      return new SuccessfulResult(XChaCha20Poly1305CipherCryptographyLayer._configurations.decrypt(hexToBytes(cipherText)));

    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
