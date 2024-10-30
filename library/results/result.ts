
export abstract class Result {
    protected readonly _data: any;

    protected readonly _isSuccessful: boolean;

    protected readonly _message: string;

    public constructor(data: any = undefined, isSuccessful: boolean = true, message: string = '') {
        this._data = data;
        this._isSuccessful = isSuccessful;
        this._message = message;
    }

    public get data(): any {
        return this._data;
    }

    public get isNotSuccessful(): boolean {
        return !this.isSuccessful;
    }

    public get isSuccessful(): boolean {
        return this._isSuccessful;
    }

    public get message(): string {
        return this._message;
    }
}
