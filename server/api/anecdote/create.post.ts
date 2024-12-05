import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId, studentId, initialId, anecdoteId, dateReported, data } = await readBody(event);
    // console.log('SERVER')

    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    // console.log(timeline)
    // console.log(adviser)
    // console.log(timeline.data)
    // console.log(adviser.data)
    const initialReport = {
        academicYear: timeline.data.schoolYear,
        dateOfIncident: dateReported,
        dateReported,
        isDraft: true,
        narrativeReport: '',
        peopleInvolved: '',
        placeOfIncident: '',
        reportIDRef: anecdoteId,
        reportedBY: adviser.id,
        status: 'Read',
        thingsInvolved: '',
        witness: ''
    };

    const anedoteReport = {
        academicYear: timeline.data.schoolYear,
        adminId: '',
        adviserId: adviser.id,
        adviserRemarks: '',
        dateOfIncident: dateReported,
        datePrepared: dateReported,
        details: '',
        facultyId: '',
        isDraft: false,
        narrativeReport: '',
        peopleInvolved: [],
        placeofIncident: '',
        preparedBy: `${adviser.data.lastName}, ${adviser.data.firstName || ''} ${adviser.data.middleName || ''} ${adviser.data.suffix || ''}`,
        purpose: '',
        remarks: '',
        reportIds: [],
        studentId,
        thingsInvolved: '',
        witnesses: []
    }
    // console.log(initialReport, anedoteReport)

    const a = await Databases.initialReportFirebaseDatabase.createOneDocumentWithId(initialId, initialReport);
    const b = await Databases.anecdotalReportFirebaseDatabase.createOneDocumentWithId(anecdoteId, anedoteReport);

    return new SuccessfulResult({ a, b, initialReport, anedoteReport }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
