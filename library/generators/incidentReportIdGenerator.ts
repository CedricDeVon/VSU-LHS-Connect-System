import { Generator } from "./generator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class IncidentReportIdGenerator extends Generator {
    public generate(id: string | number): Result {
        if (id === undefined || id === null)
        {
            return new FailedResult('Arguments must neither be undefined or null');
        }

        return new SuccessfulResult(`INC_REP-${id}`);
    }
}
