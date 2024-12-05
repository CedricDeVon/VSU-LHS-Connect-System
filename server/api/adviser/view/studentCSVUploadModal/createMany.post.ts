import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { Databases } from "~/library/databases/databases";
import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";
import { TimeConverters } from "~/library/timeConverters/timeConverters";

export default defineEventHandler(async (event) => {
    try {
        const { userId, file } = await readBody<{ userId: string, file: IFile[] }>(event);
        const studentsResult: Result = await DatasetTransformers.studentCSVDatasetTransformer.transform(file[0]);
        if (studentsResult.isNotSuccessful) {
            throw new Error(studentsResult.message);
        }
        
        const uniquenessResult: Result = await Databases.areAllStudentsNotFound(Object.keys(studentsResult.data.values));
        if (uniquenessResult.isNotSuccessful) {
            throw new Error(uniquenessResult.message);
        }

        const adviser = (await Databases.getOneAdviserViaUserId(userId)).data;
        for (const student in studentsResult.data.values) {
            // console.log(student)
            // console.log(studentsResult.data.values)
            await Databases.studentFirebaseDatabase.createOneDocumentWithId(student, {
                lastName: studentsResult.data.values[student][0],
                firstName: studentsResult.data.values[student][1],
                middleName: studentsResult.data.values[student][2],
                suffix: studentsResult.data.values[student][3],
                gender: studentsResult.data.values[student][4],
                birthDate: TimeConverters.dateConverter.convert(studentsResult.data.values[student][5]).data,
                contactNumber: studentsResult.data.values[student][6],
                address: '',
                anecdotalReportId: '',
                isEnrolled: true,
                sectionId: adviser.data.sectionId,
                adviserId: adviser.id,
                profilePicture: 'default.png'
            })
        }

        return new SuccessfulResult().cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
