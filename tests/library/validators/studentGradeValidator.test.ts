import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { StudentGradeValidator } from "../../../library/validators/studentGradeValidator";

describe('StudentGradeValidator', () => {
    let validator: StudentGradeValidator;

    beforeEach(() => {
        validator = new StudentGradeValidator();
    });

    it('should return failed result if grade is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if grade is out of range', async () => {
        const result = await validator.validate(13);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if grade is less than 1', async () => {
        const result = await validator.validate(0);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid grade', async () => {
        const result = await validator.validate(5);
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
