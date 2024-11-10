import { UidGenerator } from "./uidGenerator";
import { RandomNumberGenerator } from "./randomNumberGenerator";
import { CurrentAcademicYearStringGenerator } from "./currentAcademicYearStringGenerator";

export class Generators {
    private static readonly _uidGenerator: UidGenerator = new UidGenerator();

    private static readonly _randomNumberGenerator: RandomNumberGenerator = new RandomNumberGenerator();

    private static readonly _currentAcademicYearStringGenerator: CurrentAcademicYearStringGenerator = new CurrentAcademicYearStringGenerator();

    public static get uidGenerator(): UidGenerator {
        return Generators._uidGenerator;
    }

    public static get RandomNumberGenerator(): RandomNumberGenerator {
        return Generators._randomNumberGenerator;
    }

    public static get CurrentAcademicYearStringGenerator(): CurrentAcademicYearStringGenerator {
        return Generators._currentAcademicYearStringGenerator;
    }
}
