import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { Databases } from "~/library/databases/databases";
import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";

export default defineEventHandler(async (event) => {
    try {
        const { file } = await readBody<{ file: IFile[] }>(event);
        const studentsResult: Result = await DatasetTransformers.studentCSVDatasetTransformer.transform(file[0]);
        if (studentsResult.isNotSuccessful) {
            throw new Error(studentsResult.message);
        }
        
        const uniquenessResult: Result = await Databases.areAllStudentsNotFound(Object.keys(studentsResult.data.values));
        if (uniquenessResult.isNotSuccessful) {
            throw new Error(uniquenessResult.message);
        }

        for (const student in studentsResult.data.values) {
            await Databases.studentFirebaseDatabase.createOneDocumentWithId(student, {
                firstName: studentsResult.data.values[student][0],
                lastName: studentsResult.data.values[student][1],
                middleName: '',
                suffix: '',
                gender: '',
                birthDate: '',
                address: '',
                contactNumber: '',
                adviserId: '',
                sectionId: '',
                profilePicture: 'default.png'
            })
        }

        return new SuccessfulResult().cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
