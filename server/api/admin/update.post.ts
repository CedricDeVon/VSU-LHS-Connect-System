import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, data } = await readBody(event);

    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    await Databases.userFirebaseDatabase.updateOneDocument(userId, {
      username: data.username
    });
    await Databases.adminFirebaseDatabase.updateOneDocument(admin.id, {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName
    });

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
