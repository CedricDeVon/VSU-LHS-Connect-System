import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, initialId, incidentId, dateReported, data } = await readBody(event);
    // console.log('SERVER')

    // console.log(timeline)
    // console.log(adviser)
    // console.log(timeline.data)
    // console.log(adviser.data)
    const initialReport = {
        dateOfIncident: data.dateOfIncident,
        narrativeReport: data.narrativeReport,
        peopleInvolved: data.peopleInvolved,
        placeOfIncident: data.placeOfIncident,
        thingsInvolved: data.thingsInvolved,
        witness: data.witness
    };

    const incidentReport = {
        actionTaken: data.actionTaken,
        dateOfIncident: data.dateOfIncident,
        lastModified: dateReported,
        narrativeReport: data.narrativeReport,
        others: data.others,
        peopleInvolved: data.peopleInvolved,
        placeOfIncident: data.placeOfIncident,
        reasonOfAction: data.reasonOfAction,
        thingsInvolved: data.thingsInvolved,
        witness: data.witness
    }
    // console.log(initialReport, incidentReport)

    const a = await Databases.initialReportFirebaseDatabase.updateOneDocument(initialId, initialReport);
    const b = await Databases.incidentReportFirebaseDatabase.updateOneDocument(incidentId, incidentReport);
    return new SuccessfulResult({ a, b, initialReport, incidentReport }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
