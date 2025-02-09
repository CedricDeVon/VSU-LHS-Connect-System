import { Result } from "../results/result";
import { BufferConverter } from "./bufferConverter";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class BufferToBase64BinaryStringConverter extends BufferConverter {
  public convert(value: Buffer<ArrayBufferLike>): Result {
    try {
      return new SuccessfulResult(Buffer.from(value.toString("base64"), "base64"));

    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
