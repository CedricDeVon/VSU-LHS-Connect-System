import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import type { IFile } from "../files/iFile";
import { FileParsers } from "../fileParsers/fileParsers";
import { Validators } from "../validators/validators";
import { DatasetTransformer } from "./datasetTransformer";

export class StudentCSVDatasetTransformer extends DatasetTransformer {
    public constructor() {
        super(
            [String, String, String, String, String, String, String, String],
            [
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
                Validators.emptyValidator,
            ]);
    }

    public async transform(file: IFile): Promise<Result> {
        try {
          let validationResult: Result = FileParsers.csvFileParser.parseToString(file);
          if (validationResult.isSuccessful) {
            throw new Error(validationResult.error);
          }
    
          let rawParsedData: any[] = validationResult.data.asciiBinaryString.trim().split("\r\n");
          if (rawParsedData.length < 2) {
            throw new Error("File must contain at least 1 student");
          }
          
          let key: any;
          let cellData: any;
          let columns: any[] = rawParsedData[0].split(",");
          const keys: any[] = columns;
          const values: any = {};
          for (let rowIndex: number = 1; rowIndex < rawParsedData.length; ++rowIndex) {
            columns = rawParsedData[rowIndex].split(",");
            key = this._columnTypes[0](columns[0]);
            validationResult = await this._columnValidators[0].validate(key);
            if (validationResult.isSuccessful) {
              throw new Error(validationResult.error);
            } else if (key in values) {
              throw new Error(`'${key}' at line '${rowIndex + 1}' already exists`);
            } else if (this._columnCount !== columns.length) {
              throw new Error(
                `'${key}' at line '${rowIndex + 1}' must contain exactly '${this._columnCount}' columns`
              );
            }
    
            for (let columnIndex: number = 0; columnIndex < columns.length; ++columnIndex) {
              cellData = this._columnTypes[columnIndex](columns[columnIndex]);
              validationResult = await this._columnValidators[columnIndex].validate(cellData);
              if (validationResult.isSuccessful) {
                throw new Error(validationResult.error);
              }
            }
            columns.shift();
            values[key] = columns;
          }
          return new SuccessfulResult({ keys, values });
    
        } catch (error: any) {
          return new FailedResult(error.message);
        }
      }
}
