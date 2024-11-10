import { Logger } from './logger'
import { ConfigurationReaders } from '../configurationReaders/configurationReaders'

export class ConsoleLogger extends Logger {
    public logDebug(message: string, isLoggingEnabled: boolean = true): void {
        this.print(message, 'Debug', isLoggingEnabled);
    }

    public logInfo(message: string, isLoggingEnabled: boolean = true): void {
        this.print(message, 'Info', isLoggingEnabled);
    }

    public logWarning(message: string, isLoggingEnabled: boolean = true): void {
        this.print(message, 'Warning', isLoggingEnabled);
    }

    public logError(message: string, isLoggingEnabled: boolean = true): void {
        this.print(message, 'Error', isLoggingEnabled);
    }

    public print(message: string, logLevel: string, isLoggingEnabled: boolean = true): void {
        if (ConfigurationReaders.nuxtConfigurationReader.IS_CONSOLE_LOGGING_ENABLED && isLoggingEnabled) {
            console.log(`[${new Date().toISOString()}] - [${logLevel}] - [${message}]`);
        }
    }
}
