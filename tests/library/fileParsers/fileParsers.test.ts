import { describe, it, expect } from 'vitest';

import { FileParsers } from '../../../library/fileParsers/fileParsers';
import { CSVFileParser } from '../../../library/fileParsers/csvFileParser';
import { DataUrlFileParser } from '../../../library/fileParsers/dataUrlFileParser';

describe('FileParsers', () => {
  it('should return the CSVFileParser instance only once (singleton)', () => {
    const parser1 = FileParsers.csvFileParser;
    const parser2 = FileParsers.csvFileParser;
    expect(parser1).toBe(parser2);
  });

  it('should return the DataUrlFileParser instance only once (singleton)', () => {
    const parser1 = FileParsers.dataUrlFileParser;
    const parser2 = FileParsers.dataUrlFileParser;
    expect(parser1).toBe(parser2);
  });

  it('should handle empty CSVFileParser instance when called directly from FileParsers', () => {
    const result = FileParsers.csvFileParser;
    expect(result).toBeInstanceOf(CSVFileParser);
  });

  it('should handle empty DataUrlFileParser instance when called directly from FileParsers', () => {
    const result = FileParsers.dataUrlFileParser;
    expect(result).toBeInstanceOf(DataUrlFileParser);
  });
});
