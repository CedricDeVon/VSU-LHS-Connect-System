import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { FutureDateValidator } from "../../../library/validators/futureDateValidator";

describe('FutureDateValidator', () => {
    let validator: FutureDateValidator;

    beforeEach(() => {
        validator = new FutureDateValidator();
    });

    it('should return failed result if value is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is null', async () => {
        const result = await validator.validate(null as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is not a string, number, or date', async () => {
        const result = await validator.validate({} as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result for past date string', async () => {
        const result = await validator.validate(new Date(new Date().getTime() - 86400000).toString());
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result for past date object', async () => {
        const result = await validator.validate(new Date(new Date().getTime() - 86400000));
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid future date string', async () => {
        const result = await validator.validate(new Date(new Date().getTime() + 86400000).toString());
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid future date object', async () => {
        const result = await validator.validate(new Date(new Date().getTime() + 86400000));
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
