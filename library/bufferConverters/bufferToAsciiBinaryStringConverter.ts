import { Result } from "../results/result";
import { BufferConverter } from "./bufferConverter";
import { BufferConverters } from "./bufferConverters";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class BufferToASCIIBinaryStringConverter extends BufferConverter {
  public convert(value: Buffer<ArrayBufferLike>): Result {
    try {
      const result: Result = BufferConverters.bufferTOBase64BinaryStringConverter.convert(value);
      if (result.isSuccessful) {
        throw new Error(result.error);
      }
      return new SuccessfulResult(result.data.toString("ascii"));
      
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
