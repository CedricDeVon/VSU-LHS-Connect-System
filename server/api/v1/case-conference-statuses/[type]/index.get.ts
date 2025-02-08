import { Apis } from '~/library/apis/apis';
import { FailedResult } from '~/library/results/failedResult';
import { Benchmarkers } from '~/library/benchmarkers/benchmarkers';

export default defineEventHandler(async (event) => {
    try {
        const queryStringParameters: any = getQuery(event);
        const client: any = await Apis.nuxtRestApi.anonymousSupabaseUser(event);
        if (!client.isSuccessful) {
            setResponseStatus(event, client.status);
            return new FailedResult(client.error).toObjectWithMerge({ status: client.status });
        }
        
        let result = await Apis.nuxtRestApi.readOne(
            event, client.data, 'case_conference_status', { type: getRouterParam(event, 'type') }, queryStringParameters);
        
        setResponseStatus(event, result.status);
        return result;

    } catch (error: any) {
        setResponseStatus(event, 500)
        return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
    }
})
