import { scryptAsync } from "@noble/hashes/scrypt";
import { bytesToHex } from "@noble/hashes/utils";

import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FailedResult } from "../results/failedResult";
import { HashCryptographyLayer } from "./hashCryptographyLayer";
import { ConfigurationReaders } from "../configurationReaders/configurationReaders";

export class ScryptHashCryptographyLayer extends HashCryptographyLayer {
  private static _configurations = { N: 2 ** 16, r: 8, p: 1, dkLen: 32 };

  public async wrap(plainText: string): Promise<Result> {
    try {
      const bytes: Uint8Array = await scryptAsync(
        plainText,
        ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY,
        ScryptHashCryptographyLayer._configurations)
      return new SuccessfulResult(bytesToHex(bytes));
    } catch (error: any) {
      return new FailedResult(error);
    }
  }

  public async unwrap(plainText: string, hashText: string): Promise<Result> {
    const result: Result = await this.wrap(plainText);
    return (result.data === hashText) ? new SuccessfulResult(true) : new FailedResult();
  }
}
