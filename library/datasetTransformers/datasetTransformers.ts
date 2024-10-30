import { AdviserCSVDatasetTransformer } from "./adviserCSVDatasetTransformer";
import { StudentCSVDatasetTransformer } from "./studentCSVDatasetTransformer";

export class DatasetTransformers {
  private static readonly _adviserCSVDatasetTransformer: AdviserCSVDatasetTransformer =
    new AdviserCSVDatasetTransformer();

  private static readonly _studentCSVDatasetTransformer: StudentCSVDatasetTransformer =
    new StudentCSVDatasetTransformer();

  public static get adviserCSVDatasetTransformer(): AdviserCSVDatasetTransformer {
    return DatasetTransformers._adviserCSVDatasetTransformer;
  }

  public static get studentCSVDatasetTransformer(): StudentCSVDatasetTransformer {
    return DatasetTransformers._studentCSVDatasetTransformer;
  }
}
