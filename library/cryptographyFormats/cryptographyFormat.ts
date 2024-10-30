import { HashCryptographyLayer } from "../cryptographyLayers/hashCryptographyLayer"
import { CipherCryptographyLayer } from "../cryptographyLayers/cipherCryptographyLayer"
import { EmptyHashCryptographyLayer } from "../cryptographyLayers/emptyHashCryptographyLayer"

import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";

export abstract class CryptographyFormat {
    protected readonly _hashCryptographyLayer: HashCryptographyLayer = new EmptyHashCryptographyLayer();

    protected readonly _cipherCryptographyLayers: Array<CipherCryptographyLayer> = new Array<CipherCryptographyLayer>();
    
    protected constructor(
        cipherCryptographyLayers: Array<CipherCryptographyLayer> = Array<CipherCryptographyLayer>(),
        hashCryptographyLayer: HashCryptographyLayer = new EmptyHashCryptographyLayer()) {
        this._cipherCryptographyLayers = cipherCryptographyLayers;
        this._hashCryptographyLayer = hashCryptographyLayer;
    }

    public async wrap(text: string): Promise<Result> {
        return this.encryptLayers(text);
    }

    protected async encryptLayers(text: string): Promise<Result> {
        let result: Result = await this._hashCryptographyLayer.wrap(text);
        if (result.isNotSuccessful) {
            return result;
        }
        text = `${result.data}`;
        const cipherCryptographyLayers: Array<CipherCryptographyLayer> = this._cipherCryptographyLayers;
        for (let index = cipherCryptographyLayers.length - 1; index > -1; --index) {
            result = await cipherCryptographyLayers[index].wrap(text);
            if (result.isNotSuccessful) {
                return result;
            }
            text = `${result.data}`;
        }
        return new SuccessfulResult(text);
    }

    protected async decryptLayers(text: string): Promise<Result> {
        let result: Result;
        const cipherCryptographyLayers: Array<CipherCryptographyLayer> = this._cipherCryptographyLayers;
        for (let index = 0; index < cipherCryptographyLayers.length; ++index) {
            result = await cipherCryptographyLayers[index].unwrap(text);
            if (result.isNotSuccessful) {
                return result;
            }
            text = `${result.data}`;
        }
        return new SuccessfulResult(text);
    }
}
