import jwt from 'jsonwebtoken';

import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

export default defineEventHandler(async (event) => {
    try {
        const { id, username, email, password, status, type } = await readBody(event);
        const jsonWebToken = jwt.sign({
            data: { id, username, email, password, status, type },
            exp: Math.floor(Date.now() / 1000) + ConfigurationReaders.nuxtConfigurationReader.USER_TOKEN_DURATION_IN_SECONDS },
            ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY);
        return {
            data: jsonWebToken,
            isSuccessful: true
        };

    } catch (error: any) {
        return { isSuccessful: false, error };
    }
})
  