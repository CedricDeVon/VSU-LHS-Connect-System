import { where } from 'firebase/firestore';
import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { TimeConverters } from '~/library/timeConverters/timeConverters';

export default defineEventHandler(async (event) => {
  try {
    const { reportId, data } = await readBody(event);
    
    const adviser = (await Databases.adviserFirebaseDatabase.queryOne(
        where('facultyId', '==', data.reportedBY)
    )).data;
    data.dateOfIncident = TimeConverters.dateConverter.convert(data.dateOfIncident).data;
    data.reportedBY = adviser.id;

    const result: Result = await Databases.initialReportFirebaseDatabase.createOneDocumentWithId(reportId, data);
    if (result.isNotSuccessful) {
        throw new Error(result.message);
    }
    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
