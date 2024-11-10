import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { FileParser } from "./fileParser";
import type { IFile } from "../files/iFile";
import { ParsedFile } from "../files/parsedFile";

export class CSVFileParser extends FileParser {
  public constructor() {
    super(["csv"]);
  }

  public parseToString(file: IFile): Result {
    try {
      const parsedFile: ParsedFile = new ParsedFile(file);
      if (this._isFileExtensionInvalid(parsedFile.extension)) {
        throw new Error(
          `The selected file must be of these valid types: ${this._validFileExtensionMessage}`
        );
      }
      return new SuccessfulResult(parsedFile);
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public parseToObjects(file: IFile): Result {
    try {
      const result: Result = this.parseToString(file);
      if (result.isNotSuccessful) {
        throw new Error(result.message);
      }
      return new SuccessfulResult(
        result.data.asciiBinaryString
          .trim()
          .split(",\n")
          .map((row: any) => {
            return row.split(",");
          })
      );
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
