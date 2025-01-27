import prand from 'pure-rand';

import { Generator } from "./generator";
import { Result } from "../results/result";
import { SuccessfulResult } from '../results/successfulResult';

export class RandomNumberGenerator extends Generator {
    public generate(): Result {
        return new SuccessfulResult(prand.uniformIntDistribution(
            1, 100, prand.xoroshiro128plus(
                Date.now() ^ (Math.random() * 0x100000000)))[0]) ;
    }
}
