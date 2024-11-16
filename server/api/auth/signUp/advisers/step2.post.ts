import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { FailedResult } from "~/library/results/failedResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";
import { Databases } from "~/library/databases/databases";

export default defineEventHandler(async (event) => {
    try {
        const { advisers } = await readBody(event);
        for (const adviser of advisers) {
            let result: Result = await Databases.userFirebaseDatabase.createOneDocumentWithId(adviser.id, {
                username: `${adviser.firstName}${adviser.lastName}`,
                email: adviser.email, status: true });
            if (result.isNotSuccessful) {
                return result.cloneToObject();
            }
            result = await Databases.adviserFirebaseDatabase.createOneDocument({
                facultyId: adviser.facultyId,
                status: 'pending',
                userId: adviser.id,
                firstName: adviser.firstName,
                lastName: adviser.lastName,
                birthdate: '',
                middleName: '',
                suffix: '',
                sectionId: '',
                profilePicture: 'default.png'});
        }

        return new SuccessfulResult().cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
