import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';

export default defineEventHandler(async (event) => {
    try {
        const { name, level } = await readBody(event);

        const timeline = await Databases.getMostRecentTimeline();
        const count = (await Databases.sectionFirebaseDatabase.countCollectionDocuments()).data;
        const result: Result = await Databases.createOneSection(`S-${count + 1}`, name, level, timeline.data.schoolYear)
        return result.cloneToObject();

    } catch (error: any) {
        return new FailedResult().cloneToObject();
    }
});
  