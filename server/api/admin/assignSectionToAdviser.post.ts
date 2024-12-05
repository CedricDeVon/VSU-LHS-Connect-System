import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { where, orderBy } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  try {
    const { facultyId, sectionId } = await readBody(event);

    if (facultyId === '') {
      throw new Error('Pleas Supply a Faculty ID')
    }
    if (sectionId === '') {
      throw new Error('Pleas Supply a Section ID')
    }

    const adviser = (await Databases.getAllAdvisers()).data.find((a: any) => {
      return facultyId === a.data.facultyId;
    });
    // console.log(adviser)

    if (adviser === undefined || adviser === null || Object.keys(adviser).length < 1) {
      throw new Error(`Adviser '${facultyId}' Does Not Exist`);
    }
    if (adviser.data.status !== 'active') {
      throw new Error(`Adviser Account Must Be Active`);
    }
    if (adviser.data.sectionId !== '') {
      throw new Error(`Adviser Is Already Assigned To Section ID '${adviser.data.sectionId}'`);
    }

    await Databases.updateOneAdviserViaId(adviser.id, {
      status: 'active',
      sectionId,
    })

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
