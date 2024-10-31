
export abstract class FileParser {
    protected readonly _validFileExtensions: Array<string>;

    protected readonly _validFileExtensionMessage: string;

    public constructor(validFileExtensions: Array<string> = new Array<string>()) {
        this._validFileExtensions = validFileExtensions;
        let message: string = '[';
        const size: number = this._validFileExtensions.length - 1;
        for (let index = 0; index < size; ++index) {
            message += `.${this._validFileExtensions[index]}, `;
        }
        this._validFileExtensionMessage = `${message}.${this._validFileExtensions[size]}]`;
    }

    public get validFileExtensions(): Array<string> {
        return [...this._validFileExtensions];
    }

    public get validFileExtensionMessage(): string {
        return this._validFileExtensionMessage;
    }

    protected _isFileExtensionInvalid(fileExtension: string): boolean {
        return !this._isFileExtensionValid(fileExtension);
    }

    protected _isFileExtensionValid(fileExtension: string): boolean {
        for (let validFileExtension of this._validFileExtensions) {
            if (fileExtension === validFileExtension) {
                return true;
            }
        }
        return false;
    }
}
