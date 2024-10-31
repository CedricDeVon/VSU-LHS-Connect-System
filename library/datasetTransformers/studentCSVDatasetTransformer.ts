import { DatasetTransformer } from "./datasetTransformer";
import { Validators } from "../validators/validators";

export class StudentCSVDatasetTransformer extends DatasetTransformer {
    public constructor() {
        super(
            [String, String, String, Number],
            [Validators.emailValidator, Validators.personNameValidator, Validators.passwordValidator, Validators.personAgeValidator]);
    }
}
