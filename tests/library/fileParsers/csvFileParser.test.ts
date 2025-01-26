import { describe, it, expect } from 'vitest';

import { CSVFileParser } from '../../../library/fileParsers/csvFileParser';
import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';

describe('TODO: CSVFileParser', () => {
  // const csvParser = new CSVFileParser();
  it('', () => {

  })

  // it('should return a SuccessfulResult with parsed file when content is empty', () => {
  //   const mockFile: any = { content: '', extension: 'csv' }; // Empty CSV file
  //   const result = csvParser.parseToString(mockFile);

  //   expect(result).toBeInstanceOf(SuccessfulResult);
  //   expect(result.isSuccessful).toBe(true);
  //   expect(result.data.asciiBinaryString).toBe('');
  // });

  // it('should throw error when parsing invalid CSV structure', () => {
  //   const mockFile: any = { content: 'a,b,c\n1,2', extension: 'csv' }; // Invalid CSV format (missing a column)
  //   const result = csvParser.parseToObjects(mockFile);

  //   expect(result).toBeInstanceOf(FailedResult);
  //   expect(result.isSuccessful).toBe(false);
  //   expect(result.message).toContain('The selected file must be of these valid types');
  // });

  // it('should successfully parse CSV file with multiple rows and columns', () => {
  //   const mockFile: any = { content: 'name,age\nJohn,30\nDoe,40', extension: 'csv' }; 
  //   const result = csvParser.parseToObjects(mockFile);

  //   expect(result).toBeInstanceOf(SuccessfulResult);
  //   expect(result.isSuccessful).toBe(true);
  //   expect(result.data).toEqual([
  //     ['name', 'age'],
  //     ['John', '30'],
  //     ['Doe', '40'],
  //   ]);
  // });

  // it('should correctly handle a CSV file with only one column and multiple rows', () => {
  //   const mockFile: any = { content: 'singleColumn\n1\n2\n3', extension: 'csv' };
  //   const result = csvParser.parseToObjects(mockFile);

  //   expect(result).toBeInstanceOf(SuccessfulResult);
  //   expect(result.isSuccessful).toBe(true);
  //   expect(result.data).toEqual([['singleColumn'], ['1'], ['2'], ['3']]);
  // });

  // it('should return a FailedResult for a non-CSV file type', () => {
  //   const mockFile: any = { content: 'test data', extension: 'json' };
  //   const result = csvParser.parseToString(mockFile);

  //   expect(result).toBeInstanceOf(FailedResult);
  //   expect(result.isSuccessful).toBe(false);
  //   expect(result.message).toContain('The selected file must be of these valid types');
  // });
});
