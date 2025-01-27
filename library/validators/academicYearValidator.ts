import { Validator } from "./validator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class AcademicYearValidator extends Validator {
    private static readonly _pattern: RegExp = /^([1-9]+0?)-([1-9]+0?)$/;

    public static get pattern(): RegExp {
        return AcademicYearValidator._pattern;
    }
    
    public constructor() {
        super();
    }

    public async validate(value: string): Promise<Result> {
        if (value === undefined || value === null) {
            return new FailedResult(`Arguments must neither be undefined nor null`);
        }

        let result: boolean = AcademicYearValidator._pattern.test(value);
        if (!result) {
            return new FailedResult('Invalid academic year format, please follow the \'YYYY-YYYY\' standard.');
        }

        const tokens: string[] = value.split('-');
        return ((parseInt(tokens[1]) - parseInt(tokens[0])) !== 1) ? new SuccessfulResult() : new FailedResult('Invalid academic year format, the starting year must be one year lower than the ending year');
    }
}
