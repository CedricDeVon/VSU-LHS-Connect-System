import { Generator } from "./generator";

export class CurrentAcademicYearStringGenerator extends Generator {
    public generate(): any {
        const year: number = new Date().getFullYear();
        return `${year}-${year + 1}`;
    }
}
