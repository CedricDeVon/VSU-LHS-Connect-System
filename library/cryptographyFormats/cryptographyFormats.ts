import { FirstCryptographyFormat } from "./firstCryptographyFormat";
import { SecondCryptographyFormat } from "./secondCryptographyFormat";

export class CryptographyFormats {
  private static readonly _firstCryptographyFormat: FirstCryptographyFormat = new FirstCryptographyFormat();

  private static readonly _secondCryptographyFormat: SecondCryptographyFormat = new SecondCryptographyFormat();

  public static get firstCryptographyFormat(): FirstCryptographyFormat {
    return CryptographyFormats._firstCryptographyFormat;
  }

  public static get secondCryptographyFormat(): SecondCryptographyFormat {
    return CryptographyFormats._secondCryptographyFormat;
  }
}
