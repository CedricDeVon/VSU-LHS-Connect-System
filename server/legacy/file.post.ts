import { DatasetTransformers } from "../../library/datasetTransformers/datasetTransformers";
import { IFile } from "../../library/files/iFile";
import { Result } from "../../library/results/result";

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: IFile[] }>(event);
  console.log(event, files, files[0]);
  const result: Result = DatasetTransformers.adviserCSVDatasetTransformer.transform(files[0]);
  console.log(result);
  return result;
});
