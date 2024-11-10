import { Result } from "~/library/results/result";
import { FailedResult } from "~/library/results/failedResult";
import { Databases } from "~/library/databases/databases";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.params;
    const result: Result = await Databases.getOneAdviserViaUserId(userId);
    if (result.isNotSuccessful) {
      throw new Error(result.message);
    }
    return result.cloneToObject();
  
  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
