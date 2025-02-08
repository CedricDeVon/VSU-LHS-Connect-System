import { ConfigurationReaders } from "../configurationReaders/configurationReaders";

export class RuntimeBenchmarker {
    private _startingTimestampInMilliseconds: number;

    private _endingTimestampInMilliseconds: number;

    public get startingTimestampInMilliseconds(): number {
        return this._startingTimestampInMilliseconds;
    }

    public get endingTimestampInMilliseconds(): number {
        return this._endingTimestampInMilliseconds;
    }

    public constructor() {
        this._startingTimestampInMilliseconds = 0;
        this._endingTimestampInMilliseconds = 0;
    }

    public log(message: string = '', isForcedLoggingAllowed: boolean = false): void {
        if (!isForcedLoggingAllowed && (!this._isConsoleLoggingEnabled() || !message)) {
            return;
        }

        console.log(message);
    }

    public tick(message: string = '', isForcedLoggingAllowed: boolean = false): void {
        if (!this._startingTimestampInMilliseconds) {
            this._startingTimestampInMilliseconds = Date.now();
            
        } else {
            if ((isForcedLoggingAllowed || this._isConsoleLoggingEnabled()) && message) {
                console.log(`RuntimeBenchmark.tick() | ${new Date().toISOString()} | ${(Date.now() - this._startingTimestampInMilliseconds) / 1000} seconds ${(message) ? `| ${message}` : ''}`);
            }

            this._startingTimestampInMilliseconds = 0;
        }
    }

    public start(message: string = '', isForcedLoggingAllowed: boolean = false): void {
        if (this._startingTimestampInMilliseconds) {
            throw new Error('RuntimeBenchmarker has already started');
        }

        this._startingTimestampInMilliseconds = Date.now();
        this._endingTimestampInMilliseconds = 0;

        if ((isForcedLoggingAllowed || this._isConsoleLoggingEnabled()) && message) {
            console.log(`RuntimeBenchmark.start() | ${new Date().toISOString()} | ${(message) ? `| ${message}` : ''}`);
        }
    }

    public stop(message: string = '', isForcedLoggingAllowed: boolean = false): void {
        if (this._endingTimestampInMilliseconds) {
            throw new Error('RuntimeBenchmarker has already stoped');
        }

        this._endingTimestampInMilliseconds = Date.now();
        if ((isForcedLoggingAllowed || this._isConsoleLoggingEnabled()) && message) {
            console.log(`RuntimeBenchmark.stop() | ${new Date().toISOString()} | ${(this._endingTimestampInMilliseconds - this._startingTimestampInMilliseconds) / 1000} ms ${(message) ? '|' + message : ''}`);
        }
        this._startingTimestampInMilliseconds = 0;
    }

    public reset(message: string = '', isForcedLoggingAllowed: boolean = false): void {
        this._startingTimestampInMilliseconds = this._endingTimestampInMilliseconds = 0;
        if ((isForcedLoggingAllowed || this._isConsoleLoggingEnabled()) && message) {
            console.log(`RuntimeBenchmark.reset()`);
        }
    }

    private _isConsoleLoggingEnabled(): boolean {
        return ConfigurationReaders.nuxtConfigurationReader.getPublicRuntimeConfigValue('isConsoleLoggingEnabled').data === 'true';
    }
}

