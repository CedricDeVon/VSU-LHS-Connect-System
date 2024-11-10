import { Databases } from "~/library/databases/databases";
import { Result } from "~/library/results/result";

export default defineEventHandler(async (event) => {
  const { adviserId, status } = await readBody(event);
  const result: Result = await Databases.adviserFirebaseDatabase.updateOneDocument(adviserId, { status });
  return { data: result.data, isSuccessful: result.isSuccessful, message: result.message };
})
