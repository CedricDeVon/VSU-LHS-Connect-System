import { Databases } from '~/library/databases/databases';

export default defineEventHandler(async (event) => {
  const { email, id } = await readBody(event);

  const adminUser = (await Databases.getAdminViaUserId(id)).data;
  return {
    user: (await Databases.getUser(email)).data,
    reportsCount: (await Databases.getAllAdminReportsCount(adminUser.id)).data,
    studentsCount: (await Databases.getAllStudentsCount()).data,
    approvalsCount: (await Databases.getAllPendingAdvisersCount()).data,
  }
});
  