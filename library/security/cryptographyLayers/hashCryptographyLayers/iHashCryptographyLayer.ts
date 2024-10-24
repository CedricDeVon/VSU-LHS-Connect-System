import { ICryptographyLayer } from '../iCryptographyLayer'

export abstract class IHashCryptographyLayer extends ICryptographyLayer {
    public abstract unwrap(plainText: string, hashText: string): boolean;
}
