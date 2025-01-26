import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { DateTimeConverter } from '../../../library/converters/dateTimeConverter';


describe('DateTimeConverter', () => {
    const converter = new DateTimeConverter();
  
    it('should return a FailedResult for invalid input', () => {
      const result = converter.convert('invalid-date');
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should convert a valid date value to a date string', () => {
      const result = converter.convert('2025-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Wed Jan 01 2025');
    });
    it('should handle numeric timestamps correctly', () => {
      const result = converter.convert(1672531200000); // Timestamp for 2023-01-01
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('Sun Jan 01 2023');
    });
});
  