import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { TimeConverters } from "~/library/timeConverters/timeConverters";

export default defineEventHandler(async (event) => {
  try {
    const { userId, data } = await readBody(event);

    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    const advisers = (await Databases.getAllAdvisers()).data.filter((a: any) => {
      return a.data.status === 'active';
    });
    for (const adviser of advisers) {
        const result = await Databases.announcementFirebaseDatabase.createOneDocument({
            ...data,
            adminId: admin.id,
            adviserId: adviser.id,
            date: TimeConverters.dateConverter.convert((new Date()).toISOString()).data,
            isActive: true,
            isRead: false
        });
    }


    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
