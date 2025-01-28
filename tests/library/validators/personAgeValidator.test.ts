import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { PersonAgeValidator } from "../../../library/validators/personAgeValidator";

describe('PersonAgeValidator', () => {
    let validator: PersonAgeValidator;

    beforeEach(() => {
        validator = new PersonAgeValidator();
    });

    it('should return failed result if age is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if age is negative', async () => {
        const result = await validator.validate(-5);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if age is greater than 128', async () => {
        const result = await validator.validate(130);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result if age is a non-integer (float)', async () => {
        const result = await validator.validate(25.5);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result if age is 0', async () => {
        const result = await validator.validate(0);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result if age is within the valid range', async () => {
        const result = await validator.validate(25);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for age of 128', async () => {
        const result = await validator.validate(128);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
