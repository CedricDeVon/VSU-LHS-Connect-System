
import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    const students = (await Databases.getManyStudentsViaSectionId(adviser.data.sectionId)).data;
    const sections = (await Databases.getAllSections()).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0].data;

    return new SuccessfulResult({
        students, sections, timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
