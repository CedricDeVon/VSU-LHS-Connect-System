import { v4 as uuidv4 } from 'uuid'

import { Generator } from "./generator";
import { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from '../results/successfulResult';

export class UUIDV4Generator extends Generator {
    public generate(): Result {
        try {
            return new SuccessfulResult(uuidv4());

        } catch (error: any) {
            return new FailedResult(error.message);   
        }
    }
}
