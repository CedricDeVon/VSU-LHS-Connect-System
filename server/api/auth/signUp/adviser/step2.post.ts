import { Result } from "~/library/results/result";
import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { firstName, middleName, lastName, suffix, birthdate, facultyId, gradeLevel, sectionName } = await readBody(event);
    const result: Result = await Validators.userSignUpSpecificsValidator.validate({ firstName, middleName, lastName, suffix, birthdate, facultyId, gradeLevel, sectionName });
    return result.cloneToObject();
})
  