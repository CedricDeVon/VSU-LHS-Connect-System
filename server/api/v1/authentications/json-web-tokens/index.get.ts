import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { Cryptographers } from '~/library/cryptographers/cryptographers';

export default defineEventHandler(async (event) => {
    try {
        const queryParameters: any = getQuery(event);
        if (!queryParameters['data']) {
            setResponseStatus(event, 400);
            return new FailedResult("Verifying JsonWebTokens requires the following data: jsonWebToken").toObject();
        }
        const jsonWebTokenResult: any = Cryptographers.jsonWebTokenCryptographer.verify(queryParameters['data']);
        if (!jsonWebTokenResult.isSuccessful) {
            setResponseStatus(event, 401);
            return new FailedResult(jsonWebTokenResult.error).toObject();
        }

        setResponseStatus(event, 200);
        return new SuccessfulResult(jsonWebTokenResult.data).toObject();

    } catch (error: any) {
        setResponseStatus(event, 500);
        return new FailedResult(error.message).toObject();
    }
})

