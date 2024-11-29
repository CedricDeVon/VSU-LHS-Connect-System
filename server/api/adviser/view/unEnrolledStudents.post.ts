
import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    // const { userId } = await readBody(event);
    // const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    const students = (await Databases.getAllUnEnrolledStudents()).data;
    for (const student of students) {
      student.data['section'] = (student.data.sectionId) ? (await Databases.getOneSectionViaId(student.data.sectionId)).data : undefined;
    }
    const timeline = (await Databases.getMostRecentTimeline()).data[0].data;

    return new SuccessfulResult({
        students, timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
