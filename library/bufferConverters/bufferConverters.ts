import { BufferToASCIIBinaryStringConverter } from './bufferToAsciiBinaryStringConverter';
import { BufferToBase64BinaryStringConverter } from './bufferToBase64BinaryStringConverter';

export class BufferConverters {
    private static readonly _bufferToASCIIBInaryStringConverter: BufferToASCIIBinaryStringConverter = new BufferToASCIIBinaryStringConverter();
    
    private static readonly _bufferTOBase64BinaryStringConverter: BufferToBase64BinaryStringConverter = new BufferToBase64BinaryStringConverter();

    public static get bufferToASCIIBinaryStringConverter(): BufferToASCIIBinaryStringConverter {
        return this._bufferToASCIIBInaryStringConverter;
    }

    public static get bufferTOBase64BinaryStringConverter(): BufferToBase64BinaryStringConverter {
        return this._bufferTOBase64BinaryStringConverter;
    }
}
