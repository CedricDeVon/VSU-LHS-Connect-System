
export abstract class Result {
    protected readonly _data: any;

    protected readonly _isSuccessful: boolean;

    protected readonly _error: string;

    public constructor(data: any = undefined, isSuccessful: boolean = true, error: any = {}) {
        this._data = data;
        this._isSuccessful = isSuccessful;
        this._error = error;
    }

    public get data(): any {
        return this._data;
    }

    public get isSuccessful(): boolean {
        return this._isSuccessful;
    }

    public get error(): any {
        return this._error;
    }

    public toObject(): { data: any, isSuccessful: boolean, error: any } {
        return {
            data: this.data,
            isSuccessful: this.isSuccessful,
            error: this.error
        }
    }

    public toObjectWithMerge(dataToMerge: any = {}): { data: any, isSuccessful: boolean, error: any } {
        return {
            data: this.data,
            isSuccessful: this.isSuccessful,
            error: this.error,
            ...dataToMerge
        };
    }
}
