import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { InitialIncidentStatusValidator } from "../../../library/validators/initialIncidentStatusValidator";

describe('InitialIncidentStatusValidator', () => {
    let validator: InitialIncidentStatusValidator;

    beforeEach(() => {
        validator = new InitialIncidentStatusValidator();
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

    it('should return failed result for invalid initial incident status', async () => {
        const result = await validator.validate('processed');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid initial incident status "read"', async () => {
        const result = await validator.validate('read');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid initial incident status "unread"', async () => {
        const result = await validator.validate('unread');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});