import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id, data } = await readBody(event);

    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    data.academicYear = timeline.data.schoolYear;
    const result: Result = await Databases.caseConferenceFirebaseDatabase.createOneDocumentWithId(id, data);
    const incident = (await Databases.getOneIncidentalReportViaId(data.incidentId)).data;
    await Databases.updateOneIncidentViaId(data.incidentId, { hasCaseConference: [...incident.data.hasCaseConference, id] })

    if (result.isNotSuccessful) {
        throw new Error(result.message);
    }
    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
