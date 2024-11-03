import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { userName, email, password, confirmPassword } = await readBody(event);
    const { data, isSuccessful, message } = await Validators.userSignupBaseValidator.validate({ userName, email, password, confirmPassword });
    return { data, isSuccessful, message };
  })
  