import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const user = (await Databases.getOneUserViaId(userId)).data;
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data;
    adviser.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.data.profilePicture)).data;

    return new SuccessfulResult({
      user, adviser, timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});

