import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        const { id, email } = await readBody(event);

        const adminUser = (await Databases.getOneAdminViaUserId(id)).data;
        const user = (await Databases.getOneUserViaEmail(email)).data;
        const incidentReports = (await Databases.getAllIncidentReports()).data;
        const initialReports = (await Databases.getAllInitialReports()).data;
        const caseConferences = (await Databases.getAllCaseConferenceReports()).data;
        const timeline = (await Databases.getMostRecentTimeline()).data[0];

        return new SuccessfulResult({
            adminUser,
            user,
            incidentReports,
            initialReports,
            caseConferences,
            timeline,
          }).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  