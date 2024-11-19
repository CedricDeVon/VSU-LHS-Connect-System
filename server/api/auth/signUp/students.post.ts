import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { FailedResult } from "~/library/results/failedResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";
import { Databases } from "~/library/databases/databases";
import { SuccessfulResult } from "~/library/results/successfulResult";

export default defineEventHandler(async (event) => {
    try {
        const { file } = await readBody<{ file: IFile[] }>(event);
        const studentsResult: Result = await DatasetTransformers.studentCSVDatasetTransformer.transform(file[0]);
        if (studentsResult.isNotSuccessful) {
            throw new Error(studentsResult.message);
        }

        const uniquenessResult: Result = await Databases.areAllStudentsNotFound(Object.keys(studentsResult.data.keys));
        if (uniquenessResult.isNotSuccessful) {
            throw new Error(uniquenessResult.message);
        }

        for (const studentId in studentsResult.data) {
            let result: Result = await Databases.studentFirebaseDatabase.createOneDocumentWithId(
                studentId, {
                    lastNmae: studentsResult.data[studentId][1],
                    firstName: studentsResult.data[studentId][2],
                    middleName: studentsResult.data[studentId][3],
                    profilePicture: 'default.png',
                    isEnrolled: true
            });
            if (result.isNotSuccessful) {
                return result.cloneToObject();
            }
        }

        return new SuccessfulResult().cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
