import { Result } from "~/library/results/result";
import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { userName, email, password, confirmPassword } = await readBody(event);
    const result: Result = await Validators.userSignupBaseValidator.validate({ userName, email, password, confirmPassword });
    return result.cloneToObject();
})
  