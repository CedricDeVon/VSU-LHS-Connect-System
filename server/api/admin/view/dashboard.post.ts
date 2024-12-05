import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { id, email } = await readBody(event);

        console.log(id)
        const timeline = (await Databases.getMostRecentTimeline()).data[0];
        const adminUser = (await Databases.adminFirebaseDatabase.queryDuplicates()).data.find((a: any) => { return id === a.data.userId });
        console.log('B: ', adminUser)
        const user = (await Databases.userFirebaseDatabase.queryDuplicates()).data.find((a: any) => { return id === a.id });
        console.log('A: ', user)
        const incidentReports = (await Databases.getAllIncidentReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        const initialReports = (await Databases.getAllInitialReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        const caseConferences = (await Databases.getAllCaseConferenceReports()).data.filter((report: any) => {
            return report.data.academicYear === timeline.data.schoolYear;
        });
        // const studentsSample = (await Databases.studentFirebaseDatabase.queryDuplicates()).data;
        // const sectionSample = (await Databases.sectionFirebaseDatabase.queryDuplicates()).data;
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
  