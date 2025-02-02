import { describe, it, expect } from 'vitest';
import { FailedResult } from '../../../library/results/failedResult';

describe('FailedResult', () => {
    it('should initialize with default message and failure state', () => {
      const failedResult = new FailedResult();
      expect(failedResult.data).toEqual({});
      expect(failedResult.isSuccessful).toBe(false);
      expect(failedResult.error).toBe('');
    });
  
    it('should allow setting a custom failure message', () => {
      const message = 'An error occurred';
      const failedResult = new FailedResult(message);
  
      expect(failedResult.data).toEqual({});
      expect(failedResult.isSuccessful).toBe(false);
      expect(failedResult.error).toBe(message);
    });
  });
  