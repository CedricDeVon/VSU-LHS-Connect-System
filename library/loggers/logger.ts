
export abstract class Logger {
    public abstract logDebug(value: string, isLoggingEnabled: boolean): void;

    public abstract logInfo(value: string, isLoggingEnabled: boolean): void;
    
    public abstract logWarning(value: string, isLoggingEnabled: boolean): void;
    
    public abstract logError(value: string, isLoggingEnabled: boolean): void;
}
