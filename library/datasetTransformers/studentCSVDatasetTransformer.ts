import { Validators } from "../validators/validators";
import { DatasetTransformer } from "./datasetTransformer";

export class StudentCSVDatasetTransformer extends DatasetTransformer {
    public constructor() {
        super(
            [String, String, String, Number],
            [Validators.emailValidator, Validators.personNameValidator, Validators.passwordValidator, Validators.personAgeValidator]);
    }
}
