import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { DateConverter } from '../../../library/converters/dateConverter';

describe('DateConverter', () => {
    const converter = new DateConverter();

    it('should return a FailedResult for invalid input', () => {
    const result = converter.convert('invalid-date');
    expect(result).toBeInstanceOf(FailedResult);
    });

  
    it('should convert a valid date value to a formatted date string', () => {
      const result = converter.convert('2025-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Jan 1, 2025');
    });
    it('should handle numeric timestamps correctly', () => {
      const result = converter.convert(1672531200000); // Timestamp for 2023-01-01
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Jan 1, 2023');
    });
  
    it('should convert a leap year date correctly', () => {
      const result = converter.convert('2024-02-29');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Feb 29, 2024');
    });
  
    it('should handle extremely old dates correctly', () => {
      const result = converter.convert('1800-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Jan 1, 1800');
    });
  
    it('should handle extremely future dates correctly', () => {
      const result = converter.convert('3000-12-31');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Dec 31, 3000');
    });
  
    it('should return a copy of the months array', () => {
      const months = DateConverter.months;
      expect(months).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
      months[0] = 'Test';
      expect(DateConverter.months[0]).toBe('Jan');
    });
});