import { FailedResult } from "../results/failedResult";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { BufferConverter } from "./bufferConverter";
import { BufferConverters } from "./bufferConverters";

export class BufferToASCIIBinaryStringConverter extends BufferConverter {
  public convert(value: Buffer<ArrayBufferLike>): Result {
    try {
      const result: Result = BufferConverters.bufferTOBase64BinaryStringConverter.convert(value);
      if (result.isNotSuccessful) {
        throw new Error(result.message);
      }
      return new SuccessfulResult(result.data.toString("ascii"));
      
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
