import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const incidentReports = (await Databases.getAllIncidentReports()).data;
    const students = (await Databases.getAllStudents()).data;

    return new SuccessfulResult({
      incidentReports, students
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
