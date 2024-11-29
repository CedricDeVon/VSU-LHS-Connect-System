import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { incidentId, userId } = await readBody(event);

    const user = (await Databases.getOneUserViaId(userId)).data;
    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    const incidentReport = (await Databases.getOneIncidentalReportViaId(incidentId)).data;
    const student = (await Databases.getOneStudentViaId(incidentReport.data.studentId)).data;
    
    return new SuccessfulResult({
      user, admin, incidentReport, student
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
