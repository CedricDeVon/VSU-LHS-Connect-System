import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { IncidentStatusValidator } from "../../../library/validators/incidentStatusValidator";

describe('IncidentStatusValidator', () => {
    let validator: IncidentStatusValidator;

    beforeEach(() => {
        validator = new IncidentStatusValidator();
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

    it('should return failed result for invalid incident status', async () => {
        const result = await validator.validate('closed');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid incident status "resolved"', async () => {
        const result = await validator.validate('resolved');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid incident status "unresolved"', async () => {
        const result = await validator.validate('unresolved');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});