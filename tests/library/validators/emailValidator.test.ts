import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { EmailValidator } from "../../../library/validators/emailValidator";
import { SuccessfulResult } from "../../../library/results/successfulResult";

describe('EmailValidator', () => {
    let validator: EmailValidator;

    beforeEach(() => {
        validator = new EmailValidator();
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

    it('should return failed result for invalid email format', async () => {
        const result = await validator.validate('test@.com');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result for email missing domain', async () => {
        const result = await validator.validate('test@com');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid email format', async () => {
        const result = await validator.validate('test@example.com');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

});
