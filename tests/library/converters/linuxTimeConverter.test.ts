import { describe, it, expect } from 'vitest';

import { SuccessfulResult } from '../../../library/results/successfulResult';
import { FailedResult } from '../../../library/results/failedResult';
import { LinuxTimeConverter } from '../../../library/converters/linuxTimeConverter';

describe('LinuxTimeConverter', () => {
    const converter = new LinuxTimeConverter();
  
    it('should return a FailedResult for invalid input', () => {
      const result = converter.convert('invalid-date');
      expect(result).toBeInstanceOf(FailedResult);
    });

    it('should convert a valid date value to Linux timestamp', () => {
      const result = converter.convert('2025-01-01');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(typeof result.data).toBe('number');
    });
  
    it('should handle numeric timestamps correctly', () => {
      const result = converter.convert(1672531200000); // Timestamp for 2023-01-01
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe(1672531200); // Linux timestamp in seconds
    });
});
