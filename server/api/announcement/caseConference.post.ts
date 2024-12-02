import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { Databases } from '~/library/databases/databases';
import { where } from 'firebase/firestore';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { data } = await readBody(event);
    
    await Databases.announcementFirebaseDatabase.createOneDocument(data);

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
