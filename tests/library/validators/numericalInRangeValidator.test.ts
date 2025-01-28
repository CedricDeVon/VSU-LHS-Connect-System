import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { NumericalInRangeValidator } from "../../../library/validators/numericalInRangeValidator";

describe('NumericalInRangeValidator', () => {
    let validator: NumericalInRangeValidator;

    beforeEach(() => {
        validator = new NumericalInRangeValidator(100, 10);
    });

    it('should throw error if minimum limit equals maximum limit', () => {
        expect(() => new NumericalInRangeValidator(10, 10)).toThrowError();
    });

    it('should return failed result if value is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is null', async () => {
        const result = await validator.validate(null as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is not a number', async () => {
        const result = await validator.validate('123' as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result for value below minimum limit', async () => {
        const result = await validator.validate(5);
        expect(result).toBeInstanceOf(FailedResult);
    });
    
    it('should return failed result for value above maximum limit', async () => {
        const result = await validator.validate(150);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for value within range', async () => {
        const result = await validator.validate(50);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
