import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { TimeConverters } from "~/library/timeConverters/timeConverters";

export default defineEventHandler(async (event) => {
  try {
    const { userId, data } = await readBody(event);

    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    const advisers = (await Databases.getAllAdvisers()).data;
    for (const adviser of advisers) {
        await Databases.announcementFirebaseDatabase.createOneDocument({
            ...data,
            adminId: admin.id,
            adviserId: adviser.id,
            date: (new Date()).toISOString(),
            isActive: true,
            isRead: false
        });
    }

    return new SuccessfulResult();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
