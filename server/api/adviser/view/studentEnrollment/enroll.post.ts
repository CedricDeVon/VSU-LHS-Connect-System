import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, studentId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    await Databases.studentFirebaseDatabase.updateOneDocument(studentId, {
      isEnrolled: true,
      adviserId: adviser.id,
      sectionId: adviser.data.sectionId
    });

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
