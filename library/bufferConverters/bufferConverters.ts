import { BufferToASCIIBinaryStringConverter } from './bufferToAsciiBinaryStringConverter';
import { BufferToBase64BinaryStringConverter } from './bufferToBase64BinaryStringConverter';

export class BufferConverters {
    public static readonly bufferToASCIIBInaryStringConverter: BufferToASCIIBinaryStringConverter = new BufferToASCIIBinaryStringConverter();
    
    public static readonly bufferTOBase64BinaryStringConverter: BufferToBase64BinaryStringConverter = new BufferToBase64BinaryStringConverter();
}
