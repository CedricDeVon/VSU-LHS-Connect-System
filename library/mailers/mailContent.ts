
export class MailContent {
    private readonly _from: string;

    private readonly _to: string;

    private readonly _message: string;
    
    public constructor(from: string, to: string, message: string) {
        if (from === undefined || to === undefined || message === undefined ||
            from === null || to === null || message === null) {
            throw new Error('MailContent arguments must neither be undefined nor null');
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

    public get templateParameters(): { from_name: string, to_email: string, message: string } {
        return { from_name: this._from, to_email: this._to, message: this._message };
    }
}
