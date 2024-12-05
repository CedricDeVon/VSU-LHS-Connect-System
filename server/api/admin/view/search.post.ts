import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const advisers = (await Databases.getAllAdvisers()).data;
    const sections = (await Databases.getAllSections()).data;
    const students = (await Databases.getAllStudents()).data;
    const incidentReports = (await Databases.getAllIncidentReports()).data;
    for (const student of students) {
      student.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(student.data.profilePicture)).data;
      student.data['age'] = (new Date().getFullYear() - new Date(student.data.birthDate).getFullYear());
      student.data['incidentalReports'] = incidentReports.filter((incidentReport: any) => {
        return incidentReport.data.studentId === student.id;
      }).sort((a: any, b: any) => {
        return new Date(b.data.dateOfIncident) - new Date(a.data.dateOfIncident)
      });
    }
    for (const section of sections) {
      section.data.adviser = advisers.filter((adviser: any) => {
        return section.id === adviser.data.sectionId
      })[0];
    }
    for (const student of students) {
      student.data.section = sections.filter((section: any) => {
        return section.id === student.data.sectionId;
      })[0];
    }

    return new SuccessfulResult({
      advisers,
      sections,
      students
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
