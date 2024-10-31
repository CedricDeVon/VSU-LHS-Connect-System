import type { Result } from "../results/result";
import type { IFile } from "./iFile";

import { FileParsers } from "../fileParsers/fileParsers";

export class ParsedFile {
  private _name: string;

  private readonly _size: number;

  private readonly _contentType: string;

  private readonly _lastModified: number;

  private readonly _content: string;

  private readonly _extension: string;

  private readonly _binaryString: Buffer<ArrayBufferLike>;

  public constructor(file: IFile) {
    try {
      const result: Result = FileParsers.dataUrlFileParser.parse(file);
      if (result.isNotSuccessful) {
        throw new Error(result.message);
      }

      this._name = file.name;
      this._size = file.size;
      this._contentType = file.type;
      this._lastModified = file.lastModified;
      this._content = file.content;
      this._extension = result.data.ext;
      this._binaryString = result.data.binaryString;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public get name(): string {
    return this._name;
  }

  public get size(): number {
    return this._size;
  }

  public get contentType(): string {
    return this._contentType;
  }

  public get lastModified(): number {
    return this._lastModified;
  }

  public get content(): string {
    return this._content;
  }

  public get extension(): string {
    return this._extension;
  }

  public get binaryString(): Buffer<ArrayBufferLike> {
    return this._binaryString;
  }

  public get base64BinaryString() {
    return Buffer.from(this._binaryString.toString("base64"), "base64");
  }

  public get asciiBinaryString() {
    return this.base64BinaryString.toString("ascii");
  }

  public set name(value: string) {
    this._name = `${value}.${this._extension}`;
  }
}
