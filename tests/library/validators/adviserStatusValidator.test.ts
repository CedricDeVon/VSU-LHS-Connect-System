import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { AdviserStatusValidator } from "../../../library/validators/adviserStatusValidator";

describe('AdviserStatusValidator', () => {
    let validator: AdviserStatusValidator;

    beforeEach(() => {
        validator = new AdviserStatusValidator();
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

    it('should return failed result for invalid adviser status', async () => {
        const result = await validator.validate('expired');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid adviser status "active"', async () => {
        const result = await validator.validate('active');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid adviser status "inactive"', async () => {
        const result = await validator.validate('inactive');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid adviser status "pending"', async () => {
        const result = await validator.validate('pending');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
