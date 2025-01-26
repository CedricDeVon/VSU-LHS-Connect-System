import { describe, it, expect } from 'vitest';

import { Converters } from '../../../library/converters/converters';
import { DateConverter } from '../../../library/converters/dateConverter';
import { DateTimeConverter } from '../../../library/converters/dateTimeConverter';
import { ISOTimeConverter } from '../../../library/converters/isoTimeConverter';
import { LinuxTimeConverter } from '../../../library/converters/linuxTimeConverter';
import { LocaleDateTimeConverter } from '../../../library/converters/localeDateTimeConverter';
import { LocaleTimeConverter } from '../../../library/converters/localeTimeConverter';

describe('Converters', () => {
  it('should return an instance of ISOTimeConverter', () => {
    expect(Converters.isoTimeConverter).toBeInstanceOf(ISOTimeConverter);
  });

  it('should return an instance of DateConverter', () => {
    expect(Converters.dateConverter).toBeInstanceOf(DateConverter);
  });

  it('should return an instance of DateTimeConverter', () => {
    expect(Converters.dateTimeConverter).toBeInstanceOf(DateTimeConverter);
  });

  it('should return an instance of LinuxTimeConverter', () => {
    expect(Converters.linuxTimeConverter).toBeInstanceOf(LinuxTimeConverter);
  });

  it('should return an instance of LocaleTimeConverter', () => {
    expect(Converters.localeTimeConverter).toBeInstanceOf(LocaleTimeConverter);
  });

  it('should return an instance of LocaleDateTimeConverter', () => {
    expect(Converters.localeDateTimeConverter).toBeInstanceOf(LocaleDateTimeConverter);
  });
});
