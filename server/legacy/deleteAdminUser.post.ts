import { Databases } from "~/library/databases/databases";
import { Result } from "~/library/results/result";

export default defineEventHandler(async (event) => {
  const { userId, adviserId } = await readBody(event);
  let result: Result = await Databases.deleteUserViaId(userId);
  result = await Databases.deleteAdviserViaId(adviserId);
  return { isSuccessful: result.isSuccessful, message: result.message };
})
