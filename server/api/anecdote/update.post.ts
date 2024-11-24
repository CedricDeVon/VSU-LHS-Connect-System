import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { Result } from '~/library/results/result';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id, data, anecdote } = await readBody(event);
    
    await Databases.createOneReport(id, data);
    await Databases.updateOneAnecdoteViaId(anecdote.id, {
      reportIds: [...anecdote.data.reportIds, id]
    })

    return new SuccessfulResult().cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
