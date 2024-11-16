import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { studentId } = await readBody(event);
    const students = (await Databases.getAllStudents()).data;
    const incidentalReports = (await Databases.getAllIncidentalReports()).data;
    const incidentalReportDividers = (await Databases.getAllIncidentalReportDividers()).data;
    for (const student of students) {
      student.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(student.data.profilePicture)).data;
      student.data['age'] = (new Date().getFullYear() - new Date(student.data.birthDate).getFullYear());
      let dividers = incidentalReportDividers.filter((incidentalReportDivider: any) => {
        return student.id === incidentalReportDivider.data.studentId;
      });
      student.data['incidentalReports'] = [];
      for (const divider of dividers) {
        student.data['incidentalReports'].push(incidentalReports.find((incidentalReport: any) => {
          return divider.data.incidentId === incidentalReport.id;
        }));
      }
    }
    // console.log(students[0].data.incidentalReports);
    
    const sections = (await Databases.getAllSections()).data;
    const studentData = students.find((student: any) => student.id === studentId)

    let studentSection;
    if (studentData) {
      studentSection = sections.find((section: any) => section.id === studentData.data.sectionId);
    }
    let allSectionStudents;
    if (studentSection) {
      allSectionStudents = students.filter((student: any) => student.data.sectionId === studentSection.id);
    }

    return new SuccessfulResult({
      students, sections, incidentalReports, incidentalReportDividers, studentData, studentSection, allSectionStudents
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
