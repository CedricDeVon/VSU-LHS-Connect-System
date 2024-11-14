import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { studentId } = await readBody(event);
    const students = (await Databases.getAllStudents()).data;
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
      students, sections, studentData, studentSection, allSectionStudents
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
