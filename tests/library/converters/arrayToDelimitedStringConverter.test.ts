import { describe, it, expect } from 'vitest';
import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { ArrayToDelimitedStringConverter } from '../../../library/converters/arrayToDelimitedStringConverter';

describe('ArrayToDelimitedStringConverter', () => {
    const converter = new ArrayToDelimitedStringConverter();

    it('should convert an array to a delimited string', () => {
        const result = converter.convert({ items: ['a', 'b', 'c'], delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toBe('a,b,c');
    });

    it('should handle an empty array', () => {
        const result = converter.convert({ items: [], delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toBe('');
    });

    it('should handle a single-item array', () => {
        const result = converter.convert({ items: ['a'], delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toBe('a');
    });

    it('should throw an error when items are undefined', () => {
        const result = converter.convert({ items: undefined as any, delimeter: ',' });
        expect(result).toBeInstanceOf(FailedResult);
        expect(result.message).toBe('Argument(s) must neither be undefined nor null');
    });

    it('should throw an error when delimiter is undefined', () => {
        const result = converter.convert({ items: ['a', 'b', 'c'], delimeter: undefined as any });
        expect(result).toBeInstanceOf(FailedResult);
        expect(result.message).toBe('Argument(s) must neither be undefined nor null');
    });

    it('should handle non-string items in the array', () => {
        const result = converter.convert({ items: [1, true, null], delimeter: ',' });
        expect(result).toBeInstanceOf(SuccessfulResult);
        expect(result.data).toBe('1,true,null');
    });
});
