import { object, string } from "yup";

export const loginSchema = object({
  email: string().label("Email").email().required(),
  password: string().label("Password").min(8).max(24).required(),
});
