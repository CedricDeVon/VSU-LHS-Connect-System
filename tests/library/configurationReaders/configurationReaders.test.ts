import { describe, it, expect } from 'vitest';

import { ConfigurationReaders } from '../../../library/configurationReaders/configurationReaders';
import { NuxtConfigurationReader } from '../../../library/configurationReaders/nuxtConfigurationReader';
import { EnvironmentConfigurationReader } from '../../../library/configurationReaders/environmentConfigurationReader';


describe('ConfigurationReaders', () => {
    it('should return an instance of EnvironmentConfigurationReader', () => {
      const environmentReader = ConfigurationReaders.environmentConfigurationReader;
      expect(environmentReader).toBeInstanceOf(EnvironmentConfigurationReader);
    });
  
    it('should return an instance of NuxtConfigurationReader', () => {
      const nuxtReader = ConfigurationReaders.nuxtConfigurationReader;
      expect(nuxtReader).toBeInstanceOf(NuxtConfigurationReader);
    });
  });