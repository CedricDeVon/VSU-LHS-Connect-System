import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { PersonNameValidator } from "../../../library/validators/personNameValidator";

describe('PersonNameValidator', () => {
    let validator: PersonNameValidator;

    beforeEach(() => {
        validator = new PersonNameValidator();
    });

    it('should return failed result if name is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if name contains numbers', async () => {
        const result = await validator.validate('John123');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if name contains special characters', async () => {
        const result = await validator.validate('John@Doe');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if name is too short', async () => {
        const result = await validator.validate('J');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for a valid name', async () => {
        const result = await validator.validate('John Doe');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for name with hyphen and space', async () => {
        const result = await validator.validate("Anne-Marie O'Conner");
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
