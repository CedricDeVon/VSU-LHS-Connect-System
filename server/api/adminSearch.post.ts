import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
  const advisers = (await Databases.getAllAdvisers()).data;
  const sections = (await Databases.getAllSections()).data;
  const students = (await Databases.getAllStudents()).data;
  for (let section of sections) {
    section.data.adviser = advisers.filter((adviser: any) => {
      return section.id === adviser.data.sectionId
    })[0];
  }
  
  return {
    sections,
    students,
    advisers
  }
});
  