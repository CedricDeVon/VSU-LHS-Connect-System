
export class MailContent {
    private readonly _from: string;

    private readonly _to: string;

    private readonly _message: string;
    
    public constructor(from: string, to: string, message: string) {
        if (from === undefined || to === undefined || message === undefined ||
            from === null || to === null || message === null ||
            from === '' || to === '' || message === '') {
            throw new Error('MailContent arguments must be of type string');
        }

        this._from = from;
        this._to = to;
        this._message = message;
    }

    public get from(): string {
        return this._from;
    }

    public get to(): string {
        return this._to;
    }
    
    public get message(): string {
        return this._message;
    }

    public get templateParams(): {} {
        return { from_name: this._from, to_email: this._to, message: this._message };
    }
}
