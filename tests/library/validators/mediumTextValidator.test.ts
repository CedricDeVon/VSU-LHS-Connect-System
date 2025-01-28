import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { MediumTextValidator } from "../../../library/validators/mediumTextValidator";

describe('MediumTextValidator', () => {
    let validator: MediumTextValidator;

    beforeEach(() => {
        validator = new MediumTextValidator();
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
        const result = await validator.validate('a'.repeat(MediumTextValidator.maximumLimit));
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid medium text', async () => {
        const result = await validator.validate('a'.repeat(MediumTextValidator.maximumLimit - 1));
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
