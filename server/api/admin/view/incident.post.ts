import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { incidentId } = await readBody(event);
    const incidentDivider = (await Databases.getOneIncidentDividerViaIncidentId(incidentId)).data;
    const studentData = (await Databases.getOneStudentViaId(incidentDivider.data.studentId)).data;
    const incidentalReport = (await Databases.getOneIncidentalReportViaId(incidentDivider.data.incidentId)).data;

    return new SuccessfulResult({
      studentData, incidentalReport
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
