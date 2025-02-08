import { Apis } from '~/library/apis/apis';
import { FailedResult } from '~/library/results/failedResult';
import { Benchmarkers } from '~/library/benchmarkers/benchmarkers';

export default defineEventHandler(async (event: any) => {
    try {
        const bodyParameters: any = await readBody(event);
        const client: any = await Apis.nuxtRestApi.authenticateSupabaseUserViaJsonWebToken(event, bodyParameters['json-web-token']);
        if (!client.isSuccessful) {
            setResponseStatus(event, client.status);
            return new FailedResult(client.error).toObjectWithMerge({ status: client.status });
        }
        
        let result: any = await Apis.nuxtRestApi.createOne(
            '/api/v1/communicators/[id].post', event, client.data, 'communicator',
            { id: getRouterParam(event, 'id') }, bodyParameters);

        setResponseStatus(event, result.status);
        return result;

    } catch (error: any) {
        setResponseStatus(event, 500)
        return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
    }
})
