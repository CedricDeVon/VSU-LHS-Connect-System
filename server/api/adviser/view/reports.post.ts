import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const incidentalReports = (await Databases.getAllIncidentalReportsViaAdviserId(adviser.id)).data;
    for (const report of incidentalReports) {
      report.data['student'] = (await Databases.getOneStudentViaId(report.data.studentId)).data;
    }
    const anecdotalReports = (await Databases.getAllAnecdotalReportsViaAdviserId(adviser.id)).data;
    for (const report of anecdotalReports) {
      report.data['student'] = (await Databases.getOneStudentViaId(report.data.studentId)).data;
    }
    return new SuccessfulResult({
      adviser, timeline, incidentalReports, anecdotalReports
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
