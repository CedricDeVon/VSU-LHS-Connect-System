import { Result } from "~/library/results/result";
import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { Databases } from "~/library/databases/databases";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.params;
    const result: Result = await Databases.getOneAdminViaUserId(userId);
    if (result.isNotSuccessful) {
      throw new Error(result.message);
    }
    return new SuccessfulResult(result.data).cloneToObject();
  
  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
