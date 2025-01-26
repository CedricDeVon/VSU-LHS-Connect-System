import type { Result } from "../results/result";

export abstract class Converter {
    public abstract convert(value: any): Result;
}
