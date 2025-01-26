import { CSVFileParser } from './csvFileParser'
import { DataUrlFileParser } from './dataUrlFileParser'

export class FileParsers {
    private static readonly _csvFileParser: CSVFileParser = new CSVFileParser();
    
    private static readonly _dataUrlFileParser: DataUrlFileParser = new DataUrlFileParser();

    public static get csvFileParser(): CSVFileParser {
        return FileParsers._csvFileParser;
    }
    
    public static get dataUrlFileParser(): DataUrlFileParser {
        return FileParsers._dataUrlFileParser;
    }
}
