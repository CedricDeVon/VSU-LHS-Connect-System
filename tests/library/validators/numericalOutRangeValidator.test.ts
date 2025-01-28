import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { NumericalOutRangeValidator } from "../../../library/validators/numericalOutRangeValidator";

describe('NumericalOutRangeValidator', () => {
    let validator: NumericalOutRangeValidator;

    beforeEach(() => {
        validator = new NumericalOutRangeValidator(100, 10);
    });

    it('should throw error if minimum limit equals or exceeds maximum limit', () => {
        expect(() => new NumericalOutRangeValidator(10, 10)).toThrowError();
        expect(() => new NumericalOutRangeValidator(10, 20)).toThrowError();
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

    it('should return failed result for value inside range', async () => {
        const result = await validator.validate(50);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for value outside range', async () => {
        const result = await validator.validate(5);
        expect(result).toBeInstanceOf(SuccessfulResult);
        const result2 = await validator.validate(150);
        expect(result2).toBeInstanceOf(SuccessfulResult);
    });
});
