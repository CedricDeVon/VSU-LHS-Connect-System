import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const anecdotalReports = (await Databases.getAllAnecdotalReports()).data;
    const students = (await Databases.getAllStudents()).data;
    const sections = (await Databases.getAllSections()).data;
    const advisers = (await Databases.getAllAdvisers()).data;

    return new SuccessfulResult({
      anecdotalReports, students, sections, advisers
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
