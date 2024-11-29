import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id, name, level } = await readBody(event);
    const timeline = (await Databases.getMostRecentTimeline()).data;
    await Databases.sectionFirebaseDatabase.createOneDocumentWithId(id, { 
      name,
      level,
      schoolYear: timeline.schoolYear
    });

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
