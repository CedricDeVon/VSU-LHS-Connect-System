
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
