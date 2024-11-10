import { Databases } from "~/library/databases/databases";
import { Result } from "~/library/results/result";
import { Validators } from "~/library/validators/validators";

export default defineEventHandler(async (event) => {
    const { id, userName, email, firstName, middleName, lastName, suffix, birthdate, facultyId } = await readBody(event);
    let result: Result = await Databases.userFirebaseDatabase.createOneDocument({ id, userName, email, status: false });
    if (result.isNotSuccessful) {
        return { isSuccessful: result.isSuccessful, message: result.message };
    }
    result = await Databases.getUser(email);
    if (result.isNotSuccessful) {
        return { isSuccessful: result.isSuccessful, message: result.message };
    }
    result = await Databases.adviserFirebaseDatabase.createOneDocumentWithId(result.data.id, {
        facultyId,
        firstName,
        lastName,
        middleName,
        suffix,
        birthdate,
        profilePic: 'default.png'});
    return result.cloneToObject();
  })
  