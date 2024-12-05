import { Result } from "~/library/results/result";
import { Databases } from "~/library/databases/databases";
import { TimeConverters } from "~/library/timeConverters/timeConverters";

export default defineEventHandler(async (event) => {
    const { id, userName, email, firstName, middleName, lastName, suffix, birthdate, facultyId } = await readBody(event);
    let result: Result = await Databases.userFirebaseDatabase.createOneDocumentWithId(id, { username: userName, email, status: false });
    if (result.isNotSuccessful) {
        return result.cloneToObject();
    }

    result = await Databases.adviserFirebaseDatabase.createOneDocumentWithId(id, {
        facultyId,
        firstName,
        lastName,
        middleName,
        suffix,
        birthdate: TimeConverters.dateConverter.convert(birthdate).data,
        status: 'pending',
        userId: id,
        sectionId: '',
        profilePicture: 'default.png'});
    return result.cloneToObject();
  })
  