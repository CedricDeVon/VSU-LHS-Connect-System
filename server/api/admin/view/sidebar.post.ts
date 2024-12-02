import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { userId } = await readBody(event);

        const admin = (await Databases.getOneAdminViaUserId(userId)).data;
        const user = (await Databases.getOneUserViaId(userId)).data;

        return new SuccessfulResult({
            admin, user
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  