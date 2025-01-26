import { describe, it, expect } from 'vitest';

import type { IFile } from '../../../library/files/iFile';
import { DataUrlFileParser } from '../../../library/fileParsers/dataUrlFileParser';
import { FailedResult } from '../../../library/results/failedResult';
import { SuccessfulResult } from '../../../library/results/successfulResult';

describe('TODO: SETUP TESTS for DataUrlFileParser', () => {
  const dataUrlParser = new DataUrlFileParser();

    it('...', () => {

    })
//   it('should handle valid data URL with base64 content', () => {
//     const mockFile: any = { content: 'data:image/png;base64,encodedDataHere', extension: '' };
//     const result = dataUrlParser.parse(mockFile);

//     expect(result).toBeInstanceOf(SuccessfulResult);
//     expect(result.isSuccessful).toBe(true);
//     expect(result.data.binaryString).toBe('encodedDataHere');
//     expect(result.data.ext).toBe('image/png');
//   });

//   it('should return a FailedResult for an invalid data URL without a MIME type', () => {
//     const mockFile: any = { content: 'data:,dataWithoutMIMEType', extension: '' };
//     const result = dataUrlParser.parse(mockFile);

//     expect(result).toBeInstanceOf(FailedResult);
//     expect(result.isSuccessful).toBe(false);
//     expect(result.message).toBe('Invalid data URL');
//   });

//   it('should return a FailedResult for an incomplete data URL', () => {
//     const mockFile: any = { content: 'data:text/plain;base64,', extension: '' }; // Missing base64 data
//     const result = dataUrlParser.parse(mockFile);

//     expect(result).toBeInstanceOf(FailedResult);
//     expect(result.isSuccessful).toBe(false);
//     expect(result.message).toBe('Invalid data URL');
//   });

//   it('should correctly parse data URL with valid base64 encoding for text content', () => {
//     const mockFile: any = { content: 'data:text/plain;base64,SGVsbG8gd29ybGQ=', extension: '' }; 
//     const result = dataUrlParser.parse(mockFile);

//     expect(result).toBeInstanceOf(SuccessfulResult);
//     expect(result.isSuccessful).toBe(true);
//     expect(result.data.binaryString).toBe('SGVsbG8gd29ybGQ=');
//     expect(result.data.ext).toBe('text/plain');
//   });

//   it('should return a FailedResult if file content is empty', () => {
//     const mockFile: any = { content: '', extension: '' }; 
//     const result = dataUrlParser.parse(mockFile);

//     expect(result).toBeInstanceOf(FailedResult);
//     expect(result.isSuccessful).toBe(false);
//     expect(result.message).toBe('Invalid data URL');
//   });
});
