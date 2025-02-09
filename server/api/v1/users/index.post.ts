import { Apis } from '~/library/apis/apis';
import { FailedResult } from '~/library/results/failedResult';
import { Benchmarkers } from '~/library/benchmarkers/benchmarkers';

export default defineEventHandler(async (event: any) => {
    try {
        const bodyParameters: any = await readBody(event);
        const client: any = await Apis.nuxtRestApi.anonymousSupabaseUser(event);
        if (!client.isSuccessful) {
            setResponseStatus(event, client.status);
            return new FailedResult(client.error).toObjectWithMerge({ status: client.status });
        }
        
        const dataBodyParameters: any = bodyParameters['data'];
        if (!dataBodyParameters) {
            return new FailedResult("Data body parameters must be supplied").toObjectWithMerge({ status: 400 });
        }
        const { data: signUpData, error } = await client.auth.signUp({
            email: dataBodyParameters['email'],
            password: dataBodyParameters['password'],
        })
        if (error) {
            return new FailedResult(error).toObjectWithMerge({ status: error.status });
        }
        let result: any = await Apis.nuxtRestApi.createOne(
            '/api/v1/users.post', event, client.data, 'user',
            { id: signUpData.user.id }, bodyParameters);

        setResponseStatus(event, result.status);
        return result;

    } catch (error: any) {
        setResponseStatus(event, 500)
        return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
    }
})
