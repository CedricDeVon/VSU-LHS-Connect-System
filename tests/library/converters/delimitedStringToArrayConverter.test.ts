import { describe, it, expect } from 'vitest';
import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { DelimitedStringToArrayConverter } from '../../../library/converters/delimitedStringToArrayConverter';

describe('DelimitedStringToArrayConverter', () => {
    const converter = new DelimitedStringToArrayConverter();

    it('should convert a delimited string to an array', () => {
        const result = converter.convert({ value: 'a,b,c', delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty string input', () => {
        const result = converter.convert({ value: '', delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toEqual(['']);
    });

    it('should throw an error when input is undefined', () => {
        const result = converter.convert({ value: undefined as any, delimeter: ',' });
        expect(result).toBeInstanceOf(FailedResult);
        expect(result.error).toBe('Argument(s) must neither be undefined nor null');
    });

    it('should throw an error when delimiter is undefined', () => {
        const result = converter.convert({ value: 'a,b,c', delimeter: undefined as any });
        expect(result).toBeInstanceOf(FailedResult);
        expect(result.error).toBe('Argument(s) must neither be undefined nor null');
    });

    it('should throw an error when both value and delimiter are undefined', () => {
        const result = converter.convert({ value: undefined as any, delimeter: undefined as any });
        expect(result).toBeInstanceOf(FailedResult);
        expect(result.error).toBe('Argument(s) must neither be undefined nor null');
    });
});
