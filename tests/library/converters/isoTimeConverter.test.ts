import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { ISOTimeConverter } from '../../../library/converters/isoTimeConverter';

describe('ISOTimeConverter', () => {
    const converter = new ISOTimeConverter();
  
    it('should return a FailedResult for invalid input', () => {
      const result = converter.convert('invalid-date');
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should convert a valid date value to ISO string', () => {
      const result = converter.convert('2025-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toContain('2025-01-01T');
    });
  
    it('should handle numeric timestamps correctly', () => {
      const result = converter.convert(1672531200000); // Timestamp for 2023-01-01
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toContain('2023-01-01T');
    });
});
  