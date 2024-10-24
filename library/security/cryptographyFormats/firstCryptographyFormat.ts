import { ICryptographerFormat } from "./iCryptographyFormat"
import { Argon2IdHashCryptographyLayer } from "../cryptographyLayers/hashCryptographyLayers/argon2IdHashCryptographyLayer";
import { XChaCha20Poly1305CipherCryptographyLayer } from "../cryptographyLayers/cipherCryptographyLayers/xChaCha20Poly1305CipherCryptographyLayer";

export class FirstCryptographyFormat extends ICryptographerFormat {
    public constructor() {
        super([
            new XChaCha20Poly1305CipherCryptographyLayer()],
            new Argon2IdHashCryptographyLayer());
    }

    public unwrap(plainText: string, hashText: string): boolean {
        return this.hashCryptographyLayer.unwrap(plainText, this.decryptLayers(hashText));
    }
}
