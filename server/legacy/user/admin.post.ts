import { Databases } from "~/library/databases/databases";
import { Result } from "~/library/results/result";

export default defineEventHandler(async (event) => {
  const { userId } = await readBody(event);
  const result: Result = await Databases.getAdminViaUserId(userId);
  return { data: result.data, isSuccessful: result.isSuccessful, message: result.message };
})
