import { describe, it, expect, beforeEach } from 'vitest'; 

import { Result } from "../../../library/results/result";
import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { AcademicYearValidator } from "../../../library/validators/academicYearValidator";

describe('AcademicYearValidator', () => {
    let validator: AcademicYearValidator;

    beforeEach(() => {
        validator = new AcademicYearValidator();
    });

    it('should return failed result if value is undefined', async () => {
        const result: Result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is null', async () => {
        const result: Result = await validator.validate(null as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is not a string', async () => {
        const result: Result = await validator.validate(123 as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value is empty string', async () => {
        const result: Result = await validator.validate('');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value does not match the pattern (missing dash)', async () => {
        const result: Result = await validator.validate('20202021');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if value does not match the pattern (non-numeric part)', async () => {
        const result: Result = await validator.validate('20XX-2021');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if year difference is not 1', async () => {
        const result: Result = await validator.validate('2020-2022');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if starting year is less than ending year', async () => {
        const result: Result = await validator.validate('2021-2020');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if the starting year and ending year are the same', async () => {
        const result: Result = await validator.validate('2020-2020');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if the ending year is smaller than the starting year', async () => {
        const result: Result = await validator.validate('2021-2020');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if year format is missing leading zero for a decade year', async () => {
        const result: Result = await validator.validate('199-200');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return failed result if value has spaces around it', async () => {
        const result: Result = await validator.validate(' 2020 - 2021 ');
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for valid academic year with a difference of 1', async () => {
        const result: Result = await validator.validate('2020-2021');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for valid academic year format with year difference of 1', async () => {
        const result: Result = await validator.validate('1999-2000');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
