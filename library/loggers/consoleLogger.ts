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

import { NuxtConfigurationReader } from '../configurationReaders/nuxtConfigurationReader'

export class ConsoleLogger {
    public static logDebug(message: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.print(message, 'Debug', isLoggingEnabled);
    }

    public static logInfo(message: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.print(message, 'Info', isLoggingEnabled);
    }

    public static logWarning(message: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.print(message, 'Warning', isLoggingEnabled);
    }

    public static logError(message: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.print(message, 'Error', isLoggingEnabled);
    }

    private static print(message: string, logLevel: string, isLoggingEnabled: boolean = true) {
        if (NuxtConfigurationReader.IS_CONSOLE_LOGGING_ENABLED && isLoggingEnabled) {
            console.log(`[${new Date().toISOString()}] - [${logLevel}] - [${message}]`);
        }
    }
}
