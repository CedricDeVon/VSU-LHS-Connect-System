import { DateConverter } from "./dateConverter";
import { ISOTimeConverter } from "./isoTimeConverter";
import { DateTimeConverter } from "./dateTimeConverter";
import { LinuxTimeConverter } from "./linuxTimeConverter";
import { LocaleTimeConverter } from "./localeTimeConverter";
import { LocaleDateTimeConverter } from "./localeDateTimeConverter";

export class Converters {
    public static readonly isoTimeConverter: ISOTimeConverter = new ISOTimeConverter();

    public static readonly dateConverter: DateTimeConverter = new DateConverter();

    public static readonly dateTimeConverter: DateTimeConverter = new DateTimeConverter();

    public static readonly linuxTimeConverter: LinuxTimeConverter = new LinuxTimeConverter();

    public static readonly localeTimeConverter: LocaleTimeConverter = new LocaleTimeConverter();

    public static readonly localeDateTimeConverter: LocaleDateTimeConverter = new LocaleDateTimeConverter();
}
