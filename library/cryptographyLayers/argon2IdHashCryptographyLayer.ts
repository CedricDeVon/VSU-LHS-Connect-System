import { argon2id } from "@noble/hashes/argon2";
import { bytesToHex } from "@noble/hashes/utils";

import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FailedResult } from "../results/failedResult";
import { HashCryptographyLayer } from "./hashCryptographyLayer";
import { ConfigurationReaders } from "../configurationReaders/configurationReaders";

export class Argon2IdHashCryptographyLayer extends HashCryptographyLayer {
  private static _configurations = { t: 2, m: 65536, p: 1 };

  public async wrap(plainText: string): Promise<Result> {
    try {
      return new SuccessfulResult(bytesToHex(
        argon2id(
          plainText,
          ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY,
          Argon2IdHashCryptographyLayer._configurations)));
    } catch (error: any) {
      return new FailedResult(error);
    }
  }

  public async unwrap(plainText: string, hashText: string): Promise<Result> {
    const result: Result = await this.wrap(plainText);
    return (result.data === hashText) ? new SuccessfulResult(true) : new FailedResult();
  }
}
