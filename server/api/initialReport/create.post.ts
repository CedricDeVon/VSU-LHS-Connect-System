import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { TimeConverters } from '~/library/timeConverters/timeConverters';

export default defineEventHandler(async (event) => {
  try {
    const { userId, studentId, data } = await readBody(event);
    // console.log('SERVER')
    
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    data.reportedBY = adviser.id;
    data.studentId = studentId;
    data.academicYear = timeline.data.schoolYear;

    const result: Result = await Databases.incidentReportFirebaseDatabase.createOneDocument(data);
    if (result.isNotSuccessful) {
        throw new Error(result.message);
    }
    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
