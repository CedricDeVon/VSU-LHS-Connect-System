import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { id, email } = await readBody(event);

        const adminUser = (await Databases.getOneAdminViaUserId(id)).data;
        return new SuccessfulResult({
            user: (await Databases.getOneUserViaEmail(email)).data,
            reportsCount: (await Databases.getAllAdminReportsCount(adminUser.id)).data,
            studentsCount: (await Databases.getAllStudentsCount()).data,
            approvalsCount: (await Databases.getAllPendingAdvisersCount()).data,
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  