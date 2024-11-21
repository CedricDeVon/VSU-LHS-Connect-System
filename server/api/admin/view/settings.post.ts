import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const user = (await Databases.getOneUserViaId(userId)).data;
    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    admin.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(admin.data.profilePicture)).data;

    return new SuccessfulResult({
      user, admin, timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
