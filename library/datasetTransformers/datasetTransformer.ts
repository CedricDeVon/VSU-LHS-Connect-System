import type { Validator } from "../validators/validator";

export abstract class DatasetTransformer {
    protected readonly _columnTypes: Function[];

    protected readonly _columnValidators: Validator[];

    protected readonly _columnCount: number;

    public constructor(columnTypes: Function[], columnValidators: Validator[]) {
        DatasetTransformer._throwIfIInvalidArguments(columnTypes, columnValidators);

        this._columnTypes = columnTypes;
        this._columnValidators = columnValidators;
        this._columnCount = columnTypes.length;
    }

    private static _throwIfIInvalidArguments(columnTypes: Function[], columnValidators: Validator[]): void {
        if (DatasetTransformer._isValid(columnTypes, columnValidators)) {
            throw new Error(`DatasetTransformer.constructor(): Arguments 'columnTypes' and 'columnValidators' must be of equal length, and are of Array types`);
        }
    }

    private static _isValid(columnTypes: Function[], columnValidators: Validator[]): boolean {
        return columnTypes == undefined || columnValidators == undefined ||
        columnTypes === null || columnValidators === null ||
        columnTypes.length < 1 || columnValidators.length < 1 ||
        columnTypes.length !== columnValidators.length;
    }
}
