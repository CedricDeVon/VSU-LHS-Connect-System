import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { EnvironmentConfigurationReader } from '../../../library/configurationReaders/environmentConfigurationReader';

describe('EnvironmentConfigurationReader', () => {
    const environmentReader = new EnvironmentConfigurationReader();
  
    it('should return a FailedResult if the key is not a string', () => {
      const result = environmentReader.getValue(123 as unknown as string);
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should return a FailedResult if the environment variable does not exist', () => {
      const result = environmentReader.getValue('NON_EXISTENT_KEY');
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should return a SuccessfulResult if the environment variable exists', () => {
      process.env.TEST_KEY = 'testValue';
      const result = environmentReader.getValue('TEST_KEY');
      expect(result).toBeInstanceOf(SuccessfulResult);
      expect(result.data).toBe('testValue');
    });
  });
  