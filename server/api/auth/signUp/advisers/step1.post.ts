import { IFile } from "~/library/files/iFile";
import { Result } from "~/library/results/result";
import { FailedResult } from "~/library/results/failedResult";
import { DatasetTransformers } from "~/library/datasetTransformers/datasetTransformers";
import { Databases } from "~/library/databases/databases";
import { SuccessfulResult } from "~/library/results/successfulResult";

export default defineEventHandler(async (event) => {
    try {
        const { file } = await readBody<{ file: IFile[] }>(event);
        const advisersResult: Result = await DatasetTransformers.adviserCSVDatasetTransformer.transform(file[0]);
        if (advisersResult.isNotSuccessful) {
            throw new Error(advisersResult.message);
        }

        const uniquenessResult: Result = await Databases.areAllAdviserEmailsNotFound(Object.keys(advisersResult.data.values));
        if (uniquenessResult.isNotSuccessful) {
            throw new Error(uniquenessResult.message);
        }
        
        return new SuccessfulResult(advisersResult.data.values).cloneToObject();

    } catch (error: any) {
        return new FailedResult(error.message).cloneToObject();
    }
})
