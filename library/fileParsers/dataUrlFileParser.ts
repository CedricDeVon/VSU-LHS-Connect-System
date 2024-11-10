import { FileParser } from "./fileParser";
import type { IFile } from "../files/iFile";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class DataUrlFileParser extends FileParser {
  public constructor() {
    super();
  }

  public parse(file: IFile): Result {
    try {
      if (file === undefined || file === null) {
        throw new Error("The given file must neither be undefined or null");
      }

      const { binaryString, ext } = parseDataUrl(file.content);
      return new SuccessfulResult({
        binaryString,
        ext,
      });
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }
}
