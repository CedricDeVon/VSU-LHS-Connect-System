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

    public static logError(value: string): void {
        ConsoleLogger.logError(value);
        // FileLogger.logError(value);
    }
}
