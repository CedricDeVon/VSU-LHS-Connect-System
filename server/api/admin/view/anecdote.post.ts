import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { studentId } = await readBody(event);
    const student = (await Databases.getOneStudentViaId(studentId)).data;
    console.log(student);
    const students = (await Databases.getAllStudents()).data;
    console.log(students);
    const anecdotalReport = (await Databases.getOneAnecdotalReportViaStudentId(studentId)).data;
    console.log(anecdotalReport);
    const anecdotalReports = (await Databases.getAllAnecdotalReports()).data;
    for (const index in anecdotalReport.data.reportIds) {
      anecdotalReport.data.reportIds[index] = (await Databases.getOneReportViaId(anecdotalReport.data.reportIds[index])).data;
    }
    console.log(anecdotalReports);

    return new SuccessfulResult({
      student, students, anecdotalReport, anecdotalReports
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
