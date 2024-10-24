import { ICryptographyLayer } from '../iCryptographyLayer'

export abstract class ICipherCryptographyLayer extends ICryptographyLayer {
    public abstract unwrap(value: string): string;
}
