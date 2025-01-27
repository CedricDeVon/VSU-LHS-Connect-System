import emailjs from '@emailjs/browser';

import { Mailer } from "./mailer";
import { MailContent } from './mailContent';
import type { Result } from "../results/result";
import { FailedResult } from '../results/failedResult';
import { SuccessfulResult } from '../results/successfulResult';
import { ConfigurationReaders } from '../configurationReaders/configurationReaders';

export class UserSignedUpMailer extends Mailer {
    public async mail(mailContent: MailContent): Promise<Result> {
        try {
            if (mailContent === undefined || mailContent === null) {
                throw new Error('MailContent must not be empty');
            }
            
            await emailjs.send(
                ConfigurationReaders.nuxtConfigurationReader.getPublicRuntimeConfigValue('emailServiceId').data,
                ConfigurationReaders.nuxtConfigurationReader.getPublicRuntimeConfigValue('emailTemplateId').data,
                mailContent.templateParameters,
                ConfigurationReaders.nuxtConfigurationReader.getPublicRuntimeConfigValue('emailPublicKey').data);

            return new SuccessfulResult('Email was sent successfully');

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
