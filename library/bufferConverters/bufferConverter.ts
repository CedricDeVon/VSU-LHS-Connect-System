import { Result } from "../results/result";

export abstract class BufferConverter {
  public abstract convert(value: Buffer<ArrayBufferLike>): Result;
}
