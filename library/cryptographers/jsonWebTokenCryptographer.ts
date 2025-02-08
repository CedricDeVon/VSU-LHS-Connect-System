import jwt from 'jsonwebtoken';

import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { ConfigurationReaders } from '~/library/configurationReaders/configurationReaders';

export class JsonWebTokenCryptographer {
    public sign(data: any): Result {
        try {
            return new SuccessfulResult(jwt.sign({
                ...data, exp: Math.floor(Date.now() / 1000) + parseInt(ConfigurationReaders.nuxtConfigurationReader.getPrivateRuntimeConfigValue('jsonWebTokenDurationInSeconds').data) },
                ConfigurationReaders.nuxtConfigurationReader.getPrivateRuntimeConfigValue('jsonWebTokenPrivateKey').data));
            
        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public verify(data: any): Result {
        try {
            return new SuccessfulResult(jwt.verify(
                data, ConfigurationReaders.nuxtConfigurationReader.getPrivateRuntimeConfigValue('jsonWebTokenPrivateKey').data));
            
        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}