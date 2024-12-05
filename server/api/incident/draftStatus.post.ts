import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, initialId, incidentId } = await readBody(event);
    // console.log('SERVER')

    const a = await Databases.initialReportFirebaseDatabase.updateOneDocument(initialId, { isDraft: false });
    const b = await Databases.incidentReportFirebaseDatabase.updateOneDocument(incidentId, { isDraft: false });
    return new SuccessfulResult({ a, b }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
