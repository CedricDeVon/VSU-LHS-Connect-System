import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { LocaleDateTimeConverter } from '../../../library/converters/localeDateTimeConverter';

describe('LocaleDateTimeConverter', () => {
    const converter = new LocaleDateTimeConverter();
  
    it('should return a FailedResult for invalid input', () => {
      const result = converter.convert('invalid-date');
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should convert a valid date value to locale date string', () => {
      const result = converter.convert('2025-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
    });
  
    it('should handle numeric timestamps correctly', () => {
      const result = converter.convert(1672531200000); // Timestamp for 2023-01-01
      expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
  