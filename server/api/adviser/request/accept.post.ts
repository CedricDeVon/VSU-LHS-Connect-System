import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
    try {
        const { adviserId } = await readBody(event);
        const result: Result = await Databases.updateAdviserStatusToActiveViaId(adviserId);
        return result.cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  