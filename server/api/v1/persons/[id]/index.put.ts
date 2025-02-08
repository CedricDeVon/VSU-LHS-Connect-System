import { Apis } from '~/library/apis/apis';
import { FailedResult } from '~/library/results/failedResult';
import { Benchmarkers } from '~/library/benchmarkers/benchmarkers';

export default defineEventHandler(async (event: any) => {
    try {
        const queryStringParameters: any = getQuery(event);
        const client: any = await Apis.nuxtRestApi.authenticateSupabaseUserViaJsonWebToken(event, queryStringParameters['json-web-token']);
        if (!client.isSuccessful) {
            setResponseStatus(event, client.status);
            return new FailedResult(client.error).toObjectWithMerge({ status: client.status });
        }
        
        let result: any = await Apis.nuxtRestApi.updateOne(
            event, client.data, 'person', { id: getRouterParam(event, 'id') },
            await readBody(event));

        setResponseStatus(event, result.status);
        return result;

    } catch (error: any) {
        setResponseStatus(event, 500)
        return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
    }
})
