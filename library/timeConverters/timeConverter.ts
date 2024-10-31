import type { Result } from "../results/result";

export abstract class TimeConverter {
    public abstract convert(value: string | number): Result;
}
