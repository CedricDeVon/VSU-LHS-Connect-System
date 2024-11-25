import { DateConverter } from "./dateConverter";
import { ISOTimeConverter } from "./isoTimeConverter";
import { DateTimeConverter } from "./dateTimeConverter";
import { LinuxTimeConverter } from "./linuxTimeConverter";
import { LocaleTimeConverter } from "./localeTimeConverter";
import { LocaleDateTimeConverter } from "./localeDateTimeConverter";

export class TimeConverters {
    private static readonly _isoTimeConverter: ISOTimeConverter = new ISOTimeConverter();

    private static readonly _dateConverter: DateTimeConverter = new DateConverter();

    private static readonly _dateTimeConverter: DateTimeConverter = new DateTimeConverter();

    private static readonly _linuxTimeConverter: LinuxTimeConverter = new LinuxTimeConverter();

    private static readonly _localeTimeConverter: LocaleTimeConverter = new LocaleTimeConverter();

    private static readonly _localeDateTimeConverter: LocaleDateTimeConverter = new LocaleDateTimeConverter();

    public static get isoTimeConverter(): ISOTimeConverter {
        return TimeConverters._isoTimeConverter;
    }

    public static get dateConverter(): DateConverter {
        return TimeConverters._dateConverter;
    }

    public static get dateTimeConverter(): DateTimeConverter {
        return TimeConverters._dateTimeConverter;
    }

    public static get linuxTimeConverter(): LinuxTimeConverter {
        return TimeConverters._linuxTimeConverter;
    }

    public static get localeTimeConverter(): LocaleTimeConverter {
        return TimeConverters._localeTimeConverter;
    }

    public static get localeDateTimeConverter(): LocaleDateTimeConverter {
        return TimeConverters._localeDateTimeConverter;
    }
}
