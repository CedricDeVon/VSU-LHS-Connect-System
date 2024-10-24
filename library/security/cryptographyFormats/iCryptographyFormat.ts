import { IHashCryptographyLayer } from "../cryptographyLayers/hashCryptographyLayers/iHashCryptographyLayer"
import { ICipherCryptographyLayer } from "../cryptographyLayers/cipherCryptographyLayers/iCipherCryptographyLayer"
import { EmptyHashCryptographyLayer } from "../cryptographyLayers/hashCryptographyLayers/emptyHashCryptographerLayer"

export abstract class ICryptographerFormat {
    protected hashCryptographyLayer: IHashCryptographyLayer = new EmptyHashCryptographyLayer();

    protected cipherCryptographyLayers: Array<ICipherCryptographyLayer> = new Array<ICipherCryptographyLayer>();
    
    protected constructor(
        cipherCryptographyLayers: Array<ICipherCryptographyLayer> = Array<ICipherCryptographyLayer>(),
        hashCryptographyLayer: IHashCryptographyLayer = new EmptyHashCryptographyLayer()) {
        this.cipherCryptographyLayers = cipherCryptographyLayers;
        this.hashCryptographyLayer = hashCryptographyLayer;
    }

    public wrap(text: string): string {
        return this.encryptLayers(text);
    }

    protected encryptLayers(text: string): string {
        text = this.hashCryptographyLayer.wrap(text);
        const cipherCryptographyLayers: Array<ICipherCryptographyLayer> = this.cipherCryptographyLayers;
        for (let index = cipherCryptographyLayers.length - 1; index > -1; --index) {
            text = cipherCryptographyLayers[index].wrap(text);
        }
        return text;
    }

    protected decryptLayers(text: string): string {
        const cipherCryptographyLayers: Array<ICipherCryptographyLayer> = this.cipherCryptographyLayers;
        for (let index = 0; index < cipherCryptographyLayers.length; ++index) {
            text = cipherCryptographyLayers[index].unwrap(text);
        }
        return text;
    }
}
