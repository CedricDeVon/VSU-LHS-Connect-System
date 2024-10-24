import { AesCipherCryptographyLayer } from "../cryptographyLayers/cipherCryptographyLayers/aesCipherCryptographyLayer";
import { XChaCha20Poly1305CipherCryptographyLayer } from "../cryptographyLayers/cipherCryptographyLayers/xChaCha20Poly1305CipherCryptographyLayer";
import { ICryptographerFormat } from "./iCryptographyFormat"

export class SecondCryptographyFormat extends ICryptographerFormat {
    public constructor() {
        super([
            new XChaCha20Poly1305CipherCryptographyLayer(),
            new AesCipherCryptographyLayer()]);
    }

    public unwrap(hashText: string): string {
        return this.decryptLayers(hashText);
    }
}
