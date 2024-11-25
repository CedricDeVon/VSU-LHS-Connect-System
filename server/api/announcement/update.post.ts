import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id, data } = await readBody(event);

    await Databases.announcementFirebaseDatabase.updateOneDocument(id, data);
    return new SuccessfulResult();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
