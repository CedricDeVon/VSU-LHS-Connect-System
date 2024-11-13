import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
    try {
        const { userId, adviserId } = await readBody(event);
        let result: Result = await Databases.deleteOneUserViaId(userId);
        if (result.isNotSuccessful) {
            throw new Error(result.message);
        }
        result = await Databases.deleteOneAdviserViaId(adviserId);
        return result;

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  