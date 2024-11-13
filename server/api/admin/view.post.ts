import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id, email } = await readBody(event);
    
    const admin = (await Databases.getOneAdminViaUserId(id)).data;
    const user = (await Databases.getOneUserViaEmail(email)).data;
    const advisers = (await Databases.getAllAdvisers()).data;
    const sections = (await Databases.getAllSections()).data;
    const students = (await Databases.getAllStudents()).data;
    const reportsCount = (await Databases.getAllAdminReportsCount(admin.id)).data;
    const studentsCount = (await Databases.getAllStudentsCount()).data;
    const approvalsCount = (await Databases.getAllPendingAdvisersCount()).data;
    for (let section of sections) {
      section.data.adviser = advisers.filter((adviser: any) => {
        return section.id === adviser.data.sectionId
      })[0];
    }
    return new SuccessfulResult({
      advisers,
      sections,
      students,
      admin,
      user,
      reportsCount,
      studentsCount,
      approvalsCount
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
