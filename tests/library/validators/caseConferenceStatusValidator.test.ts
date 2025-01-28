import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { CaseConferenceStatusValidator } from "../../../library/validators/caseConferenceStatusValidator";

describe('CaseConferenceStatusValidator', () => {
    let validator: CaseConferenceStatusValidator;

    beforeEach(() => {
        validator = new CaseConferenceStatusValidator();
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

    it('should return failed result for invalid case conference status', async () => {
        const result = await validator.validate('in-progress');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid case conference status "complete"', async () => {
        const result = await validator.validate('complete');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid case conference status "pending"', async () => {
        const result = await validator.validate('pending');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});

