import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { firstName, middleName, lastName, suffix, birthdate, facultyId, gradeLevel, sectionName } = await readBody(event);
    const { data, isSuccessful, message } = await Validators.userSignUpSpecificsValidator.validate({ firstName, middleName, lastName, suffix, birthdate, facultyId, gradeLevel, sectionName });
    return { data, isSuccessful, message };
  })
  