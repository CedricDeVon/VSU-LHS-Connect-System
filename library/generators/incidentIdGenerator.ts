import { Generator } from "./generator";
import { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class IncidentIdGenerator extends Generator {
    public generate(id: string | number): Result {
        if (id === undefined || id === null) {
            return new FailedResult('Argument(s) must neither be undefined nor null');
        
        } else if (typeof id !== 'string' && typeof id !== 'number') {
            return new FailedResult('Argument(s) must either be of type string or number');
        }

        return new SuccessfulResult(`INC-${id}`);
    }
}
