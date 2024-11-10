import { UidGenerator } from "./uidGenerator";

export class Generators {
    private static readonly _uuidGenerator: UidGenerator = new UidGenerator();

    public static get uuidGenerator(): UidGenerator {
        return Generators._uuidGenerator;
    }
}
