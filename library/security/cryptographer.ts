import { FirstCryptographyFormat } from "./cryptographyFormats/firstCryptographyFormat";
import { SecondCryptographyFormat } from "./cryptographyFormats/secondCryptographyFormat";

export class Cryptographer {
  private static firstCryptographyFormat: FirstCryptographyFormat = new FirstCryptographyFormat();

  private static secondCryptographyFormat: SecondCryptographyFormat = new SecondCryptographyFormat();

  public static get FirstCryptographyFormat(): FirstCryptographyFormat {
    return Cryptographer.firstCryptographyFormat;
  }

  public static get SecondCryptographyFormat(): SecondCryptographyFormat {
    return Cryptographer.secondCryptographyFormat;
  }
}
