import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { PhoneNumberValidator } from "../../../library/validators/phoneNumberValidator";

describe('PhoneNumberValidator', () => {
    let validator: PhoneNumberValidator;

    beforeEach(() => {
        validator = new PhoneNumberValidator();
    });

    it('should return failed result if phone number is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if phone number contains invalid characters', async () => {
        const result = await validator.validate('123-abc');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if phone number is less than 7 digits', async () => {
        const result = await validator.validate('12345');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if phone number is more than 15 digits', async () => {
        const result = await validator.validate('+1234567890123456');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for a valid phone number', async () => {
        const result = await validator.validate('+1234567890');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for a phone number with the optional "+" prefix', async () => {
        const result = await validator.validate('1234567890');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
