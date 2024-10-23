import { ConsoleLogger } from './consoleLogger';
// import { FileLogger } from './fileLogger';

export class Logger {
    public static logDebug(value: string): void {
        ConsoleLogger.logDebug(value);
        // FileLogger.logDebug(value);
    }

    public static logInfo(value: string): void {
        ConsoleLogger.logInfo(value);
        // FileLogger.logInfo(value);
    }

    public static logWarning(value: string): void {
        ConsoleLogger.logWarning(value);
        // FileLogger.logWarning(value);
    }

    public static logError(value: string): void {
        ConsoleLogger.logError(value);
        // FileLogger.logError(value);
    }
}
