import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { LargeTextValidator } from "../../../library/validators/largeTextValidator";

describe('LargeTextValidator', () => {
    let validator: LargeTextValidator;

    beforeEach(() => {
        validator = new LargeTextValidator();
    });

    it('should return failed result if value is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is null', async () => {
        const result = await validator.validate(null as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is not a string', async () => {
        const result = await validator.validate(123 as any);
        expect(result).toBeInstanceOf(FailedResult);
    });
    
    it('should return failed result for text exceeding maximum limit', async () => {
        const result = await validator.validate('a'.repeat(LargeTextValidator.maximumLimit));
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid large text', async () => {
        const result = await validator.validate('a'.repeat(LargeTextValidator.maximumLimit - 1));
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
