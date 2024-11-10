import { Databases } from '~/library/databases/databases';
import { Result } from '~/library/results/result';
import { getCurrentUser } from 'vuefire';

export default defineEventHandler(async (event) => {
    try {
        const currentUser = await getCurrentUser();
        const { email } = await readBody(event);
        const result: Result = await Databases.getUser(email);
        return {
            data: result.data,
            isSuccessful: result.isSuccessful,
            isNotSuccessful: result.isNotSuccessful,
            message: result.message
        };

    } catch (error: any) {
        return error;
    }
});

  