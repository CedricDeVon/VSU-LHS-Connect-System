import { describe, it, expect } from 'vitest';
import { SuccessfulResult } from '../../../library/results/successfulResult';

describe('SuccessfulResult', () => {
    it('should initialize with default values', () => {
      const successResult = new SuccessfulResult();
      expect(successResult.data).toEqual(undefined);
      expect(successResult.isSuccessful).toBe(true);
      expect(successResult.error).toBe('');
    });
  
    it('should allow setting custom data and message', () => {
      const data = { id: 123 };
      const message = 'Success';
      const successResult = new SuccessfulResult(data, message);
  
      expect(successResult.data).toEqual(data);
      expect(successResult.isSuccessful).toBe(true);
      expect(successResult.error).toBe(message);
    });
  });