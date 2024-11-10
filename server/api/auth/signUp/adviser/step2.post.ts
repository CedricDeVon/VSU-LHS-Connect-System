import { Result } from "~/library/results/result";
import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { firstName, middleName, lastName, suffix, birthdate, facultyId, } = await readBody(event);
    const result: Result = await Validators.userSignUpSet2Validator.validate({ firstName, middleName, lastName, suffix, birthdate, facultyId, });
    return result.cloneToObject();
})
  