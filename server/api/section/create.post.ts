import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';

export default defineEventHandler(async (event) => {
    try {
        const { id, name, level } = await readBody(event);

        const temp = (await Databases.getOneSectionViaId(id));
        if (!temp) {
            throw new Error('Section ID must be unique');
        }

        const timeline = (await Databases.getMostRecentTimeline()).data[0];
        const count = (await Databases.sectionFirebaseDatabase.countCollectionDocuments()).data;
        const result: Result = await Databases.createOneSection(id || `S-${count + 1}`, name, level, timeline.data.schoolYear)
        return result.cloneToObject();

    } catch (error: any) {
        return new FailedResult().cloneToObject();
    }
});
  