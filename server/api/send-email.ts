
import { NuxtConfigurationReader } from '~/library/configurationReaders/nuxtConfigurationReader';

export default defineEventHandler(async (event) => {

  const configReader = new NuxtConfigurationReader();

  return{
    emailServiceId: configReader.EMAIL_SERVICE_ID,
    emailTemplateId: configReader.EMAIL_TEMPLATE_ID,
    emailPublicKey: configReader.EMAIL_PUBLIC_KEY
  };

});