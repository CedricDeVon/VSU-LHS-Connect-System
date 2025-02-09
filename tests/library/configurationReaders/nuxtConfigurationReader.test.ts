import { describe, it, expect } from 'vitest';

import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';
import { NuxtConfigurationReader } from '../../../library/configurationReaders/nuxtConfigurationReader';

// TODO: Figure out how to integrate NuxtJs with Vitest
describe('NuxtConfigurationReader', () => {
    const nuxtReader = new NuxtConfigurationReader();
  
    it('should return a FailedResult if the key is not a string for public config', () => {
      const result = nuxtReader.getPublicRuntimeConfigValue(123 as unknown as string);
      expect(result).toBeInstanceOf(FailedResult);
    });
    it('should return a FailedResult if the public runtime config variable does not exist', () => {
      const result = nuxtReader.getPublicRuntimeConfigValue('nonExistentKey');
      expect(result).toBeInstanceOf(FailedResult);
      expect(result.error).toContain('does not exist');
    });
    
    it('should return a FailedResult if the key is not a string for private config', () => {
      const result = nuxtReader.getPrivateRuntimeConfigValue(123 as unknown as string);
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should return a FailedResult if the private runtime config variable does not exist', () => {
      const result = nuxtReader.getPrivateRuntimeConfigValue('nonExistentKey');
      expect(result).toBeInstanceOf(FailedResult);
    });
  
    it('should return a SuccessfulResult if the public runtime config variable exists', () => {
      const result = nuxtReader.getPublicRuntimeConfigValue('testPublicConfiguration');
      expect(result).toBeInstanceOf(SuccessfulResult);
    });
  
    
    it('should return a SuccessfulResult if the private runtime config variable exists', () => {
      const result = nuxtReader.getPrivateRuntimeConfigValue('testPrivateConfiguration');
      expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
  