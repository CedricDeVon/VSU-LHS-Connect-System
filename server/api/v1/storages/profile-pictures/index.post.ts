import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { Cryptographers } from '~/library/cryptographers/cryptographers';

let isCurrentlyRunning: boolean = false;

export default defineEventHandler(async (event) => {
    try {
        if (isCurrentlyRunning) {
            return new FailedResult('This REST API endpoint is currently pending').toObject();
        }
        isCurrentlyRunning = true;

        const { data: bodyData } = await readBody(event);

        const jsonWebTokenResult = Cryptographers.jsonWebTokenCryptographer.verify(bodyData['json-web-token']);
        if (!jsonWebTokenResult.isSuccessful) {
            setResponseStatus(event, 401);
            return new FailedResult(jsonWebTokenResult.error).toObject();
        }
        let result: any = await Databases.supabaseDatabase.createServerClient(event);
        if (!result.isSuccessful) {
            setResponseStatus(event, 400);
            return new FailedResult(result.error).toObject();
        }
        const authenticationResult = await result.data.auth.signInWithPassword({
            email: jsonWebTokenResult.data.email, password: jsonWebTokenResult.data.password,
        })
        if (authenticationResult.error) {
            setResponseStatus(event, 401);
            return new FailedResult(authenticationResult.error).toObject();
        }
        const { error: storageError } = await result.storage.from('profile_picture').upload(
            '.', bodyData.file, { upsert: true })
        if (!storageError) {
            setResponseStatus(event, (!result.status) ? 500 : result.status);
            return new FailedResult(result).toObject();
        }

        isCurrentlyRunning = false;
        setResponseStatus(event, 200);
        return new SuccessfulResult(result.data).toObject();

    } catch (error: any) {
        setResponseStatus(event, 500);
        return new FailedResult(error.message).toObject();
    }
})
