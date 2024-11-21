import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    adviser.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.data.profilePicture)).data;
    const user = (await Databases.getOneUserViaId(userId)).data;
    const section = (await Databases.getOneSectionViaId(adviser.data.sectionId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    return new SuccessfulResult({
      adviser,
      user,
      section,
      timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
