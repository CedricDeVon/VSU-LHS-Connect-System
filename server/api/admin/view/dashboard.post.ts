import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { id, email } = await readBody(event);

        const adminUser = (await Databases.getOneAdminViaUserId(id)).data;
        const user = (await Databases.getOneUserViaEmail(email)).data;
        const reportsCount = (await Databases.getAllAdminReportsCount(adminUser.id)).data;
        const studentsCount = (await Databases.getAllStudentsCount()).data;
        const approvalsCount = (await Databases.getAllPendingAdvisersCount()).data;

        return new SuccessfulResult({
            user,
            reportsCount,
            studentsCount,
            approvalsCount,
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  