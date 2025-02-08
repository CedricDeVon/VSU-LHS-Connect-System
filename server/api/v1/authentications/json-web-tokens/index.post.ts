import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Cryptographers } from '~/library/cryptographers/cryptographers';

export default defineEventHandler(async (event) => {
    try {
        const { data } = await readBody(event);

        if (!data.email || !data.password) {
            setResponseStatus(event, 400);
            return new FailedResult("Signing JsonWebTokens requires the following data: email, and password").toObject();
        }

        let result: any = await Databases.supabaseDatabase.createServerClient(event);
        if (!result.isSuccessful) {
            setResponseStatus(event, 400);
            return new FailedResult(result.error).toObject();
        }

        setResponseStatus(event, 200);
        return Cryptographers.jsonWebTokenCryptographer.sign(data).toObject();

    } catch (error: any) {
        setResponseStatus(event, 500);
        return new FailedResult(error.message).toObject();
    }
})