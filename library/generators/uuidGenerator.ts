import { v7 as uuidv7 } from 'uuid'

import { Generator } from "./generator";

export class UuidGenerator extends Generator {
    public generate(): any {
        return uuidv7();
    }
}
