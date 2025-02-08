import { JsonWebTokenCryptographer } from "./jsonWebTokenCryptographer";

export class Cryptographers {
    public static readonly jsonWebTokenCryptographer: JsonWebTokenCryptographer = new JsonWebTokenCryptographer();
}

