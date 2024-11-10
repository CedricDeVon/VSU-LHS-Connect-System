import { Databases } from "~/library/databases/databases";
import { Validators } from "~/library/validators/validators";
import { Result } from "~/library/results/result";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { data, isSuccessful, message } = await Validators.userLoginValidator.validate({ email, password });
  const result: Result = await Databases.getAdminViaUserId(data.id);
  return { isAdmin: result.data !== undefined, data, isSuccessful, message };
})
