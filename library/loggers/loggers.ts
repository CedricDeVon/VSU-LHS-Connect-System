import { ConsoleLogger } from './consoleLogger';
// import { FileLogger } from './fileLogger';

export class Loggers {
    protected static readonly _consoleLogger: ConsoleLogger = new ConsoleLogger();

    public static get consoleLogger(): ConsoleLogger {
        return Loggers._consoleLogger;
    }

    public static logDebug(value: string, isLoggingEnabled: boolean = true): void {
        Loggers._consoleLogger.logDebug(value, isLoggingEnabled);
        // FileLogger.logDebug(value, isLoggingEnabled);
    }

    public static logInfo(value: string, isLoggingEnabled: boolean = true): void {
        Loggers._consoleLogger.logInfo(value, isLoggingEnabled);
        // FileLogger.logInfo(value, isLoggingEnabled);
    }

    public static logWarning(value: string, isLoggingEnabled: boolean = true): void {
        Loggers._consoleLogger.logWarning(value, isLoggingEnabled);
        // FileLogger.logWarning(value, isLoggingEnabled);
    }

    public static logError(value: string, isLoggingEnabled: boolean = true): void {
        Loggers._consoleLogger.logError(value, isLoggingEnabled);
        // FileLogger.logError(value, isLoggingEnabled);
    }
}
