import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { IFile } from '../../../library/files/iFile';
import { ParsedFile } from '../../../library/files/parsedFile';
import { FailedResult } from '../../../library/results/failedResult';
import { FileParsers } from '../../../library/fileParsers/fileParsers';
import { SuccessfulResult } from '../../../library/results/successfulResult';

describe('ParsedFile', () => {
  const mockFile: IFile = {
    name: 'testfile',
    size: 1024,
    type: 'text/plain',
    lastModified: 1672531200000, // Timestamp for 2023-01-01
    content: 'This is a test file.',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error if file parsing fails', () => {
    const mockResult = new FailedResult('Parsing failed');
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    expect(() => new ParsedFile(mockFile)).toThrow('Parsing failed');
  });

  it('should initialize correctly with a valid file', () => {
    const mockResult = new SuccessfulResult({
      ext: 'txt',
      binaryString: Buffer.from('This is a test file.'),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const parsedFile = new ParsedFile(mockFile);

    expect(parsedFile.name).toBe('testfile');
    expect(parsedFile.size).toBe(1024);
    expect(parsedFile.contentType).toBe('text/plain');
    expect(parsedFile.lastModified).toBe(1672531200000);
    expect(parsedFile.content).toBe('This is a test file.');
    expect(parsedFile.extension).toBe('txt');
    expect(parsedFile.binaryString).toEqual(Buffer.from('This is a test file.'));
    expect(parsedFile.base64BinaryString).toBe(Buffer.from('This is a test file.').toString('base64'));
    expect(parsedFile.asciiBinaryString).toBe(Buffer.from('This is a test file.').toString('ascii'));
  });


  it('should update the file name with the correct extension when name is set', () => {
    const mockResult = new SuccessfulResult({
      ext: 'txt',
      binaryString: Buffer.from('This is a test file.'),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const parsedFile = new ParsedFile(mockFile);
    parsedFile.name = 'newfile';
    expect(parsedFile.name).toBe('newfile.txt');
  });

  it('should handle edge cases for content', () => {
    const mockResult = new SuccessfulResult({
      ext: 'txt',
      binaryString: Buffer.from(''),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const emptyContentFile: IFile = { ...mockFile, content: '' };
    const parsedFile = new ParsedFile(emptyContentFile);

    expect(parsedFile.content).toBe('');
    expect(parsedFile.binaryString).toEqual(Buffer.from(''));
    expect(parsedFile.base64BinaryString.toString()).toBe('');
    expect(parsedFile.asciiBinaryString).toBe('');
  });

  it('should correctly handle non-text file content', () => {
    const binaryData = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const mockResult = new SuccessfulResult({
      ext: 'bin',
      binaryString: Buffer.from(binaryData.buffer),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const binaryFile: IFile = {
      ...mockFile,
      content: 'Binary file content',
    };
    const parsedFile = new ParsedFile(binaryFile);

    expect(parsedFile.extension).toBe('bin');
    expect(parsedFile.binaryString).toEqual(Buffer.from(binaryData.buffer));
    expect(parsedFile.base64BinaryString.toString('base64')).toBe(Buffer.from(binaryData.buffer).toString('base64'));
    expect(parsedFile.asciiBinaryString).not.toBe('');
  });

  it('should handle large files gracefully', () => {
    const largeContent = 'A'.repeat(10_000_000); // 10MB content
    const mockResult = new SuccessfulResult({
      ext: 'txt',
      binaryString: Buffer.from(largeContent),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const largeFile: IFile = {
      ...mockFile,
      content: largeContent,
    };
    const parsedFile = new ParsedFile(largeFile);

    expect(parsedFile.size).toBe(1024);
    expect(parsedFile.binaryString.byteLength).toBe(largeContent.length);
  });

  it('should handle files with unusual extensions', () => {
    const mockResult = new SuccessfulResult({
      ext: 'weirdExt',
      binaryString: Buffer.from('Unusual extension file content'),
    });
    vi.spyOn(FileParsers.dataUrlFileParser, 'parse').mockReturnValue(mockResult);

    const unusualFile: IFile = {
      ...mockFile,
      name: 'unusualFile',
      content: 'Unusual extension file content',
    };
    const parsedFile = new ParsedFile(unusualFile);

    expect(parsedFile.name).toBe('unusualFile');
    expect(parsedFile.extension).toBe('weirdExt');
  });
});
