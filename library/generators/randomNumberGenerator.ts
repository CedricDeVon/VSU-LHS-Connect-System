import prand from 'pure-rand';

import { Generator } from "./generator";

export class RandomNumberGenerator extends Generator {
    public generate(): any {
        return prand.uniformIntDistribution(
            1, 100, prand.xoroshiro128plus(
                Date.now() ^ (Math.random() * 0x100000000)))[0];
    }
}
