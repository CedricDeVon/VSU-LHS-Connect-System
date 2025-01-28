import { Validator } from "./validator";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class NumericalInRangeValidator extends Validator {
    public readonly minimumLimit: number = 0;

    public readonly maximumLimit: number= 0;

    public constructor(maximumLimit: number, minimumLimit: number = 0) {
        if (maximumLimit === undefined || maximumLimit === null || 
            minimumLimit === undefined || minimumLimit === null || 
            typeof maximumLimit !== 'number' || typeof minimumLimit !== 'number' || 
            maximumLimit === minimumLimit) {
            throw new Error('Argument(s) must neither be undefined, null, nor of equal value');

        } else if (minimumLimit == maximumLimit) {
            throw new Error(`Argument(s) must not be equal`);
        }
        
        super();

        this.minimumLimit = minimumLimit;
        this.maximumLimit = maximumLimit;
    }
    
    public async validate(value: number): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`);

        } else if (value < this.minimumLimit) {
            return new FailedResult(`Argument(s) must be greater than or equal to '${this.minimumLimit}'`);

        } else if (value > this.maximumLimit) {
            return new FailedResult(`Argument(s) must be less than or equal to '${this.maximumLimit}'`);
        }

        return new SuccessfulResult();
    }
}
