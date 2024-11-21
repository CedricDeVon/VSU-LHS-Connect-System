import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const initialReports = (await Databases.getAllInitialReportsViaAdviserId(adviser.id)).data;
    const anecdotalReports = (await Databases.getAllAnecdotalReportsViaAdviserId(adviser.id)).data;
    return new SuccessfulResult({
      timeline, initialReports, anecdotalReports
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
