import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { Validators } from '~/library/validators/validators';

export default defineEventHandler(async (event) => {
    try {
        const { id, name, level } = await readBody(event);

        if (id === '') {
            throw new Error('Section ID must not be empty');

        } else if (name === '') {
            throw new Error('Section Name must not be empty');

        } else if (level === '') {
            throw new Error('Section Level must not be empty');
        }
        
        if (level < 7 || 10 < level) {
            throw new Error('Section levels must be between 7 to 10')
        }

        const section = (await Databases.getOneSectionViaId(id)).data;
        if (section !== undefined || section.data !== undefined) {
            throw new Error('Section ID must be unique');
        }

        const timeline = (await Databases.getMostRecentTimeline()).data[0];
        const result: Result = await Databases.createOneSection(id, name, level, timeline.data.schoolYear)
        return result.cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
});
  