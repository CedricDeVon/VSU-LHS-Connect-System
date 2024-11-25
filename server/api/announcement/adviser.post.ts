import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { Databases } from '~/library/databases/databases';
import { where } from 'firebase/firestore';

export default defineEventHandler(async (event) => {
  try {
    const { adviserId } = await readBody(event);
    
    const result: Result = await Databases.announcementFirebaseDatabase.queryDuplicates(
      where('adviserId', '==', adviserId));
    return result.cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
