import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { PasswordValidator } from "../../../library/validators/passwordValidator";

describe('PasswordValidator', () => {
    let validator: PasswordValidator;

    beforeEach(() => {
        validator = new PasswordValidator();
    });

    it('should return failed result if password is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if password is null', async () => {
        const result = await validator.validate(null as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if password does not contain 8 characters', async () => {
        const result = await validator.validate('short1!');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if password does not contain a number', async () => {
        const result = await validator.validate('password!');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if password does not contain a symbol', async () => {
        const result = await validator.validate('password123');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if password contains whitespace', async () => {
        const result = await validator.validate('password 123!');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid password', async () => {
        const result = await validator.validate('valid123!');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
