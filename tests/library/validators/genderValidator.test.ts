import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { GenderValidator } from "../../../library/validators/genderValidator";

describe('GenderValidator', () => {
    let validator: GenderValidator;

    beforeEach(() => {
        validator = new GenderValidator();
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

    it('should return failed result for invalid gender', async () => {
        const result = await validator.validate('unknown');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid gender "male"', async () => {
        const result = await validator.validate('male');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid gender "female"', async () => {
        const result = await validator.validate('female');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid gender "others"', async () => {
        const result = await validator.validate('others');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
