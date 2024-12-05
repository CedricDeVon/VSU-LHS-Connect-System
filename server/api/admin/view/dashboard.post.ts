import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { id, email } = await readBody(event);

        const timeline = (await Databases.getMostRecentTimeline()).data[0];
        const adminUser = (await Databases.getOneAdminViaUserId(id)).data;
        const user = (await Databases.getOneUserViaEmail(email)).data;
        const incidentReports = (await Databases.getAllIncidentReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        const initialReports = (await Databases.getAllInitialReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        const caseConferences = (await Databases.getAllCaseConferenceReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        const students = (await Databases.getAllStudents()).data;
        for (const caseConference of caseConferences) {
            const incident = (await Databases.getOneIncidentalReportViaId(caseConference.data.incidentId)).data;
            const student = (await Databases.getOneStudentViaId(incident.data.studentId)).data;
            const section = (await Databases.getOneSectionViaId(student.data.sectionId)).data;
            caseConference.data.incident = incident;
            caseConference.data.student = student;
            caseConference.data.section = section;
        }
        for (const initialReport of initialReports) {
            initialReport.data.reportedAdviser = (await Databases.getOneAdviserViaId(initialReport.data.reportedBY)).data;
        }
        console.log(initialReports)

        return new SuccessfulResult({
            adminUser,
            user,
            incidentReports,
            initialReports,
            caseConferences,
            timeline,
            students,
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  