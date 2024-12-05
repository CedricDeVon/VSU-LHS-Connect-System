import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, studentId, initialId, incidentId, dateReported, data } = await readBody(event);
    // console.log('SERVER')

    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    // console.log(timeline)
    // console.log(adviser)
    // console.log(timeline.data)
    // console.log(adviser.data)
    const initialReport = {
        academicYear: timeline.data.schoolYear,
        dateOfIncident: data.dateOfIncident,
        dateReported,
        isDraft: false,
        narrativeReport: data.narrativeReport,
        peopleInvolved: data.peopleInvolved,
        placeOfIncident: data.placeOfIncident,
        reportIDRef: incidentId,
        reportedBY: adviser.id,
        status: 'Unread',
        thingsInvolved: data.thingsInvolved,
        witness: data.witness
    };

    const incidentReport = {
        academicYear: timeline.data.schoolYear,
        actionTaken: data.actionTaken,
        adviserId: adviser.id,
        dateOfIncident: data.dateOfIncident,
        dateReported,
        hasCaseConference: [],
        isDraft: false,
        lastModified: dateReported,
        narrativeReport: data.narrativeReport,
        others: data.others,
        peopleInvolved: data.peopleInvolved,
        placeOfIncident: data.placeOfIncident,
        reasonOfAction: data.reasonOfAction,
        reportId: initialId,
        status: 'NotResolved',
        studentId,
        thingsInvolved: data.thingsInvolved,
        timeline: timeline.id,
        witness: data.witness.split(',').map((a: any) => { return a.trim() })
    }
    // console.log(initialReport, incidentReport)

    const a = await Databases.initialReportFirebaseDatabase.createOneDocumentWithId(initialId, initialReport);
    const b = await Databases.incidentReportFirebaseDatabase.createOneDocumentWithId(incidentId, incidentReport);

    return new SuccessfulResult({ a, b, initialReport, incidentReport }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
