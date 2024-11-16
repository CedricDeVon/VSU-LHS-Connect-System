import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const advisers = (await Databases.getAllAdvisers()).data;
    const sections = (await Databases.getAllSections()).data;
    const students = (await Databases.getAllStudents()).data;
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
