import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { Databases } from "~/library/databases/databases";
import { FailedResult } from "~/library/results/failedResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";
import { SuccessfulResult } from "~/library/results/successfulResult";

export default defineEventHandler(async (event) => {
    try {
        const { file } = await readBody<{ file: IFile[] }>(event);
        let result: Result = await DatasetTransformers.adviserCSVDatasetTransformer.transform(file[0]);
        if (result.isNotSuccessful) {
            throw new Error(result.message);
        }
        
        // result = await Databases.areAllAdviserEmailsNotFound(Object.keys(result.data.values));
        // if (result.isNotSuccessful) {
        //     throw new Error(result.message);
        // }
        
        // for (const adviserEmail in result.data.values) {

        //     result = await Databases.userFirebaseDatabase.createOneDocumentWithId(id, { userName, email, status: false });
        //     if (result.isNotSuccessful) {
        //         return result.cloneToObject();
        //     }
        //     result = await Databases.adviserFirebaseDatabase.createOneDocumentWithId(id, {
        //         facultyId,
        //         firstName,
        //         lastName,
        //         middleName,
        //         suffix,
        //         birthdate,
        //         status: 'pending',
        //         userId: id,
        //         profilePic: 'default.png'});            
        // }

        return result.cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})

// return result.cloneToObject();