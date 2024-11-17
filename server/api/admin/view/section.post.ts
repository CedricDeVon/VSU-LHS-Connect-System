import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { sectionId } = await readBody(event);

    const section = (await Databases.getOneSectionViaId(sectionId)).data;
    const adviser = (await Databases.getOneAdviserViaSectionId(sectionId)).data;
    const sectionStudents = (await Databases.getAllStudentsViaSectionId(sectionId)).data;
    const sectionIncidentReports = (await Databases.getAllIncidentReportsViaFacultyId(adviser.data.facultyId)).data;
    for (const student of sectionStudents) {
      student.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(student.data.profilePicture)).data;
    }
    adviser.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.data.profilePicture)).data;

    return new SuccessfulResult({
      section,
      adviser,
      sectionStudents,
      sectionIncidentReports
    }).cloneToObject();

  } catch (error: any) {
    return new FailedResult(error.message).cloneToObject();
  }
});
//     async created() {
//         const sectionId = this.$route.params.id;
//         adminViewStore.sectionSection = section.find(sec => String(sec.id) === String(sectionId));

//         if (!adminViewStore.sectionSection) {
//             console.error('Section not found:', sectionId);
//             return;
//         }

//         if (adminViewStore.sectionSection.adviserId) {
//             adminViewStore.sectionAdviser = adviser.find(adv => adv.id === adminViewStore.sectionSection.adviserId);
//         }
//     },


