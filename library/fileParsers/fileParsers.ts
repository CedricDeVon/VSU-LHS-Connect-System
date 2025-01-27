import { CSVFileParser } from './csvFileParser'
import { DataUrlFileParser } from './dataUrlFileParser'

export class FileParsers {
    public static readonly csvFileParser: CSVFileParser = new CSVFileParser();
    
    public static readonly dataUrlFileParser: DataUrlFileParser = new DataUrlFileParser();
}
