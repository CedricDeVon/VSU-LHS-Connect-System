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
  const adminData = (await Databases.getOneAdminViaUserId(id)).data;
  const userData = (await Databases.getUser(email)).data;
  
  return {
    sections,
    students,
    advisers
  }
});
  
// const adminUser = ;
// return {
//   user: ,
//   reportsCount: (await Databases.getAllAdminReportsCount(adminUser.id)).data,
//   studentsCount: (await Databases.getAllStudentsCount()).data,
//   approvalsCount: (await Databases.getAllPendingAdvisersCount()).data,
//   advisers: (await Databases.getAllAdvisers()).data