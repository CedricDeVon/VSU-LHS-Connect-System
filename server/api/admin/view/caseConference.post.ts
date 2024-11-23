import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { caseConferenceId } = await readBody(event);
    const caseConferenceReport = (await Databases.getOneCaseConferenceReportViaId(caseConferenceId)).data;
    const incidentReport = (await Databases.getOneIncidentalReportViaId(caseConferenceReport.data.incidentId)).data;
    const student = (await Databases.getOneStudentViaId(incidentReport.data.studentId)).data;
    const section = (await Databases.getOneSectionViaId(student.data.sectionId)).data;

    console.log('B ', caseConferenceReport, incidentReport, student, section);

    return new SuccessfulResult({
      incidentReport, caseConferenceReport, student, section
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
