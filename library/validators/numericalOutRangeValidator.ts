import { Validator } from "./validator";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class NumericalOutRangeValidator extends Validator {
    public readonly minimumLimit: number = 0;

    public readonly maximumLimit: number= 0;

    public constructor(maximumLimit: number, minimumLimit: number = 0) {
        if (maximumLimit === undefined || maximumLimit === null || 
            minimumLimit === undefined || minimumLimit === null || 
            typeof maximumLimit !== 'number' || typeof minimumLimit !== 'number' || 
            maximumLimit === minimumLimit) {
            throw new Error('Argument(s) must neither be undefined, null, nor of equal value');

        } else if (minimumLimit >= maximumLimit) {
            throw new Error(`Argument(s) must not be equal nor is the 'minimumLimit' argument greater than 'maximumLimit'`);
        }
        
        super();

        this.minimumLimit = minimumLimit;
        this.maximumLimit = maximumLimit;
    }
    
    public async validate(value: number): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`);

        } else if (this.minimumLimit <= value && value <= this.maximumLimit) {
            return new FailedResult(`Argument(s) must not be within the range [${this.minimumLimit}, ${this.maximumLimit}]`);
        }

        return new SuccessfulResult();
    }
}
