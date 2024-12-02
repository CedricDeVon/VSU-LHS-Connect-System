import { where } from 'firebase/firestore';
import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { TimeConverters } from '~/library/timeConverters/timeConverters';

export default defineEventHandler(async (event) => {
  try {
    const { reportId, data } = await readBody(event);
    
    

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
