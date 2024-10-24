import { NuxtConfigurationReader } from "~/library/configurationReaders/nuxtConfigurationReader";
import { Cryptographer } from "~/library/security/cryptographer";
import { Logger } from '~/library/loggers/logger'

export default defineEventHandler(async () => {
  const a = NuxtConfigurationReader.getPublicValue("environmentName");
  const b = "TheQuickBrownFoxJumpsOverTheLazyDog";
  const c = Cryptographer.FirstCryptographyFormat.wrap(b);
  const d = Cryptographer.SecondCryptographyFormat.wrap(c);

  console.log('SERVER:');
  Logger.logDebug(`${a}`);
  Logger.logInfo(`${b}`);
  Logger.logWarning(`${c}`);
  Logger.logError(`${d}`);

  return {
    a,
    b,
    c,
    d,
    e: Cryptographer.FirstCryptographyFormat.unwrap(b, c),
    f: Cryptographer.SecondCryptographyFormat.unwrap(d)
  };
});
