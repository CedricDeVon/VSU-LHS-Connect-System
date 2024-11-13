import jwt from 'jsonwebtoken';

import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

export default defineEventHandler(async (event) => {
    try {
        const { id, username, email, password, status, role } = await readBody(event);
        const jsonWebToken = jwt.sign({
            data: { id, username, email, password, status, role },
            exp: Math.floor(Date.now() / 1000) + ConfigurationReaders.nuxtConfigurationReader.USER_TOKEN_DURATION_IN_SECONDS },
            ConfigurationReaders.nuxtConfigurationReader.CRYPTOGRAPHY_KEY);
        return new SuccessfulResult(jsonWebToken).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
  