import type { IFile } from "../files/iFile";

import { FailedResult } from "../results/failedResult";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { FileParser } from "./fileParser";

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
