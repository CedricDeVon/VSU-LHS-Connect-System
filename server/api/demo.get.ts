import { NuxtConfigurationReader } from "~/library/configurationReaders/nuxtConfigurationReader";
import { Cryptographer } from "~/library/security/cryptographer";
import { Logger } from '~/library/loggers/logger'

export default defineEventHandler(async () => {
  const a = NuxtConfigurationReader.getPublicValue("environmentName");
  const b = "TheQuickBrownFoxJumpsOverTheLazyDog";
  const c = Cryptographer.FirstCryptographyFormat.wrap(b);
  const d = Cryptographer.SecondCryptographyFormat.wrap(c);

  // console.log('SERVER:');
  // Logger.logDebug(`${NuxtConfigurationReader.getPublicValue("environmentName")}`);
  // Logger.logInfo(`${"TheQuickBrownFoxJumpsOverTheLazyDog"}`);
  // Logger.logWarning(`${Cryptographer.FirstCryptographyFormat.wrap(b)}`);
  // Logger.logError(`${Cryptographer.SecondCryptographyFormat.wrap(c)}`);
  // Logger.logWarning(`${Cryptographer.FirstCryptographyFormat.unwrap(b, c)}`);
  // Logger.logError(`${Cryptographer.SecondCryptographyFormat.unwrap(d)}`);

  return {
    a,
    b,
    c,
    d,
  };
});
