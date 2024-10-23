import createLogger from 'logging';

export class ConsoleLogger {
    private static debugLogger = createLogger('Debug');

    private static infoLogger = createLogger('Info');

    private static warningLogger = createLogger('Warning');

    private static errorLogger = createLogger('Error');

    public static logDebug(value: string): void {
        this.debugLogger.debug(value);
    }

    public static logInfo(value: string): void {
        this.infoLogger.info(value);
    }

    public static logWarning(value: string): void {
        this.warningLogger.warn(value);
    }

    public static logError(value: string): void {
        this.errorLogger.error(value);
    }
}
