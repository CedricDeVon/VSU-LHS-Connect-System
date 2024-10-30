import type { Result } from "../results/result";

export abstract class CryptographyLayer {
    public abstract wrap(plainText: string): Promise<Result>;
}
