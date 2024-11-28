import { Result } from '~/library/results/result';
import { FailedResult } from '~/library/results/failedResult';
import { Databases } from '~/library/databases/databases';
import { where } from 'firebase/firestore';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    let announcements: any = (await Databases.announcementFirebaseDatabase.queryDuplicates(
      where('adviserId', '==', adviser.id))).data;
    for (const announcement of announcements) {
      announcement.data.by = (await Databases.adminFirebaseDatabase.readOneDocument(announcement.data.adminId)).data;
    }

    return new SuccessfulResult({
      announcements
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
