import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const userData = (await Databases.getOneUserViaId(userId)).data;
    const adminData = (await Databases.getOneAdminViaUserId(userId)).data;
    adminData.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adminData.data.profilePicture)).data;

    return new SuccessfulResult({
      userData, adminData
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
