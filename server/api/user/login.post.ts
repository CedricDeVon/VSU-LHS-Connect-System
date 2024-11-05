import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { data, isSuccessful, message } = await Validators.userLoginValidator.validate({ email, password });
  return { data, isSuccessful, message };
})
