import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const adviser = (await Databases.getOneAdviserViaUserId(id)).data;
    const students = (await Databases.getManyStudentsViaSectionId(adviser.data.sectionId)).data;
    const sections = (await Databases.getAllSections()).data;
    const timeline = (await Databases.getMostRecentTimeline()).data[0].data;
    for (const student of students) {
      const section = sections.find((section: any) => section.id === student.data.sectionId);
      student.data['gradeAndSection'] = (section) ? `Grade ${section.data.level}, ${section.data.name}` : 'N/A';
      student.data['age'] = (new Date().getFullYear() - new Date(student.data.birthDate).getFullYear())
      student.data['anecdotalReport'] = (await Databases.getOneAnecdotalReportViaId(student.data.anecdotalReportId)).data;
      
      student.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(student.data.profilePicture)).data;
    }
    // console.log('DEBUG', adviser)
    // console.log('DEBUG', students)
    // console.log('DEBUG', sections)
    // console.log('DEBUG', timeline)

    return new SuccessfulResult({
      students,
      timeline
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
