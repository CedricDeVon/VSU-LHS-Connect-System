import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { where, orderBy } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  try {
    const { adviserId } = await readBody(event);

    const result = await Databases.updateOneAdviserViaId(adviserId, {
        status: 'inActive',
        sectionId: '',
        facultyId: ''
    });
    // console.log(result)

    const students = (await Databases.studentFirebaseDatabase.queryDuplicates(
        where('adviserId', '==', adviserId)
    )).data;
    for (const student of students) {
        await Databases.updateOneStudentViaId(student.id, {
            adviserId: ''
        });
    }
    // console.log('Done')

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
