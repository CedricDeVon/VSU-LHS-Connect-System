import { Result } from "../results/result";

export abstract class Generator {
    public abstract generate(data: any): Result;
}
