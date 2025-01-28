import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class AcademicYearValidator extends Validator {
    private static readonly _pattern: RegExp = /([1-9]{1,}0?)-([1-9]{1,}0?)/;

    public static get pattern(): RegExp {
        return AcademicYearValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null || typeof value !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`);
        }

        let result: boolean = AcademicYearValidator._pattern.test(value);
        if (!result) {
            return new FailedResult('Invalid academic year, please follow the \'YYYY-YYYY\' format');
        }

        const tokens: string[] = value.split('-');
        
        return ((parseInt(tokens[1]) - parseInt(tokens[0])) === 1) ? new SuccessfulResult() : new FailedResult('Invalid academic year, the starting year must be one year lower than the ending year');
    }
}
