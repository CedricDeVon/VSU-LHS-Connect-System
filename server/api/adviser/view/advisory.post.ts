import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(id)).data;
    const students = (await Databases.getManyStudentsViaSectionId(adviser.sectionId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0].data;

    return new SuccessfulResult({
      students,
      timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
