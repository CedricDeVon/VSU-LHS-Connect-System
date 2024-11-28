import { where } from 'firebase/firestore';
import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { userId } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
    adviser.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.data.profilePicture)).data;
    const user = (await Databases.getOneUserViaId(userId)).data;
    const section = (await Databases.getOneSectionViaId(adviser.data.sectionId)).data;
    const students = (await Databases.getAllStudentsViaSectionId(adviser.data.sectionId)).data;
    section.data.population = students.length;
    const timeline = (await Databases.getMostRecentTimeline()).data[0];
    const announcements: any = (await Databases.announcementFirebaseDatabase.queryDuplicates(
      where('adviserId', '==', adviser.id))).data;
    for (const announcement of announcements) {
      announcement.data.by = (await Databases.adminFirebaseDatabase.readOneDocument(announcement.data.adminId)).data;
    }

    return new SuccessfulResult({
      adviser,
      user,
      section,
      students,
      timeline,
      announcements
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
