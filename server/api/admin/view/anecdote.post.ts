import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { studentId } = await readBody(event);
    const studentData = (await Databases.getOneStudentViaId(studentId)).data;
    const anecdotalDivider = (await Databases.getOneAnecdotalDividerViaStudentId(studentId)).data;
    const anecdotalReport = (await Databases.getOneAnecdotalReportViaId(anecdotalDivider.data.anecdoteId)).data;

    return new SuccessfulResult({
      studentData, anecdotalReport
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
