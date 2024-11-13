import jwt from 'jsonwebtoken';

import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

export default defineEventHandler(async (event) => {
    try {
        const { jsonWebToken } = await readBody(event);
        return new SuccessfulResult(jwt.verify(jsonWebToken, ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY)).cloneToObject(); 

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})

