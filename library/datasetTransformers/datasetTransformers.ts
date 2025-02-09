import { AdviserCSVDatasetTransformer } from "./adviserCSVDatasetTransformer";
import { StudentCSVDatasetTransformer } from "./studentCSVDatasetTransformer";

export class DatasetTransformers {
  public static readonly adviserCSVDatasetTransformer: AdviserCSVDatasetTransformer = new AdviserCSVDatasetTransformer();

  public static readonly studentCSVDatasetTransformer: StudentCSVDatasetTransformer = new StudentCSVDatasetTransformer();
}
