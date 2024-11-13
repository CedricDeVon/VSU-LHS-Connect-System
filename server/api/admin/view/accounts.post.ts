import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        return new SuccessfulResult({
            advisers: (await Databases.getAllAdvisers()).data
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  