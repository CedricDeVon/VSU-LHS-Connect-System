import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';

export default defineEventHandler(async (event) => {
  try {
    const { sectionId } = await readBody(event);

    const section = (await Databases.getOneSectionViaId(sectionId)).data;
    const adviser = (await Databases.getOneAdviserViaSectionId(sectionId)).data;
    const sectionStudents = (await Databases.getAllStudentsViaSectionId(sectionId)).data;
    let sectionIncidentReports = (await Databases.getAllIncidentReports()).data;
    // console.log('SERVER')
    // console.log(section, adviser, sectionStudents, sectionIncidentReports);
    
    for (const student of sectionStudents) {
      student.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(student.data.profilePicture)).data;
    }
    sectionIncidentReports = sectionIncidentReports.filter((incidentReport: any) => {
      const student = sectionStudents.find((student: any) => { return incidentReport.data.studentId === student.id });
      return (student) ? student.data.sectionId === adviser.data.sectionId : false;
    })
    
    adviser.data.profilePicture = (await Databases.userIconsFirebaseStorage.readFileLink(adviser.data.profilePicture)).data;
    // console.log(section, adviser, sectionStudents, sectionIncidentReports);

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
