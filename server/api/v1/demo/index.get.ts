import { serverSupabaseClient } from '#supabase/server'
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
    try {
        let result: any;
        // const url: any = getRequestURL(event);
        const query: any = getQuery(event);
        const superbase: any = await serverSupabaseClient(event);
        
        result = await superbase.schema('production').from('admin_status').select(query.properties);
        if (!result.data) {
            return new FailedResult({ ...result }).toObject();
        }

        return new SuccessfulResult({ ...result }).toObject();

    } catch (error: any) {
        return new FailedResult(error.message).toObject();
    }
})
