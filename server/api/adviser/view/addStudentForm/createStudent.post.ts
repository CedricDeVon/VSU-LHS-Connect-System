import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, studentData } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    await Databases.studentFirebaseDatabase.createOneDocumentWithId(
      studentData.studentId, {
        adviserId: adviser.id,
        sectionId: adviser.data.sectionId,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        middleName: studentData.middleName,
        suffix: studentData.suffix,
        gender: studentData.gender,
        address: studentData.address,
        contactNumber: studentData.contactNumber,
        isEnrolled: studentData.isEnrolled,
        birthDate: studentData.birthDate,
        profilePicture: studentData.profilePicture
      });

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
