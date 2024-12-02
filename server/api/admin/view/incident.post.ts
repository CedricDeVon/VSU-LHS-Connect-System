import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { incidentId, userId } = await readBody(event);

    const user = (await Databases.getOneUserViaId(userId)).data;
    const admin = (await Databases.getOneAdminViaUserId(userId)).data;
    const incidentReport = (await Databases.getOneIncidentalReportViaId(incidentId)).data;
    const adviser = (await Databases.getOneAdviserViaId(incidentReport.data.adviserId)).data;
    const student = (await Databases.getOneStudentViaId(incidentReport.data.studentId)).data;
    const initialReports = (await Databases.getAllInitialReports()).data;
    const advisers = (await Databases.getAllAdvisers()).data;
    const caseConferences = (await Databases.getAllCaseConferenceReports()).data;

    return new SuccessfulResult({
      user,
      admin,
      adviser,
      incidentReport,
      student,
      initialReports,
      advisers,
      caseConferences
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
