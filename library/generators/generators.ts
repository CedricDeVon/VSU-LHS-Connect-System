import { UuidGenerator } from "./uuidGenerator";

export class Generators {
    private static readonly _uuidGenerator: UuidGenerator = new UuidGenerator();

    public static get uuidGenerator(): UuidGenerator {
        return Generators._uuidGenerator;
    }
}
