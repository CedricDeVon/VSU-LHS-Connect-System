import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { PastDateValidator } from "../../../library/validators/pastDateValidator";

describe('PastDateValidator', () => {
    let validator: PastDateValidator;

    beforeEach(() => {
        validator = new PastDateValidator();
    });

    it('should return failed result if date is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if date is in the future', async () => {
        const result = await validator.validate(new Date('2050-01-01'));
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if date is invalid string', async () => {
        const result = await validator.validate('invalid date' as any);
        expect(result).toBeInstanceOf(FailedResult);
    });
    
    it('should return failed result if date is today', async () => {
        const result = await validator.validate(new Date());
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result if date is in the past', async () => {
        const result = await validator.validate(new Date('2000-01-01'));
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
