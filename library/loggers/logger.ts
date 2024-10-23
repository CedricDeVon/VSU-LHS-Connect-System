import { ConsoleLogger } from './consoleLogger';
// import { FileLogger } from './fileLogger';

export class Logger {
    public static logDebug(value: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.logDebug(value, isLoggingEnabled);
        // FileLogger.logDebug(value, isLoggingEnabled);
    }

    public static logInfo(value: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.logInfo(value, isLoggingEnabled);
        // FileLogger.logInfo(value, isLoggingEnabled);
    }

    public static logWarning(value: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.logWarning(value, isLoggingEnabled);
        // FileLogger.logWarning(value, isLoggingEnabled);
    }

    public static logError(value: string, isLoggingEnabled: boolean = true): void {
        ConsoleLogger.logError(value, isLoggingEnabled);
        // FileLogger.logError(value, isLoggingEnabled);
    }
}

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
