import { Generator } from "./generator";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";

export class CurrentAcademicYearGenerator extends Generator {
    public generate(): Result {
        const year: number = new Date().getFullYear();
        return new SuccessfulResult(`${year}-${year + 1}`);
    }
}
