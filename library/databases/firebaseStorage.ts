import firebaseApp from "firebase/app";
import firebaseStorage from "firebase/storage";

import { ConfigurationReaders } from "../configurationReaders/configurationReaders";
import { ParsedFile } from "../files/parsedFile";
import { FailedResult } from "../results/failedResult";
import { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { Database } from "./database";

export class FirebaseStorage extends Database {
  private readonly _folderPath: string;

  public constructor(folderPath: string) {
    super();

    this._folderPath = `${ConfigurationReaders.nuxtConfigurationReader.ENVIRONMENT_NAME}/${folderPath}`;
  }

  public get folderPath(): string {
    return this._folderPath;
  }

  public async readFileLink(filePath: string): Promise<Result> {
    try {
      const storage: firebaseStorage.FirebaseStorage = firebaseStorage.getStorage(
        firebaseApp.getApp(),
        ConfigurationReaders.nuxtConfigurationReader.FIREBASE_STORAGE_URL
      );
      return new SuccessfulResult(
        await firebaseStorage.getDownloadURL(
          firebaseStorage.ref(storage, this._generateCompleteFilePath(filePath))
        )
      );
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public async readFileLinks(filePaths: string[]): Promise<Result> {
    try {
      let result: Result;
      const urlCollection: string[] = [];
      for (let filePath of filePaths) {
        result = await this.readFileLink(filePath);
        if (result.isNotSuccessful) {
          throw new Error(result.message);
        }
        urlCollection.push(result.data);
      }
      return new SuccessfulResult(urlCollection);
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public writeFile(
    parsedFile: ParsedFile,
    snapshotCallback = (snapshot: firebaseStorage.UploadTaskSnapshot) => {},
    completeCallback = () => {},
    errorCallback = (error: firebaseStorage.StorageError) => {}
  ): Result {
    try {
      if (parsedFile === undefined || parsedFile === null) {
        throw new Error("Pleas supply a parsedFile");
      }
      const storage: firebaseStorage.FirebaseStorage = firebaseStorage.getStorage(
        firebaseApp.getApp(),
        ConfigurationReaders.nuxtConfigurationReader.FIREBASE_STORAGE_URL
      );
      const { name, base64BinaryString, contentType } = parsedFile;
      const uploadTask: firebaseStorage.UploadTask = firebaseStorage.uploadBytesResumable(
        firebaseStorage.ref(storage, this._generateCompleteFilePath(name)),
        base64BinaryString,
        { contentType }
      );
      uploadTask.on("state_changed", snapshotCallback, errorCallback, completeCallback);
      return new SuccessfulResult(uploadTask);
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public writeFiles(
    parsedFiles: ParsedFile[],
    snapshotCallback = (snapshot: firebaseStorage.UploadTaskSnapshot) => {},
    completeCallback = () => {},
    errorCallback = (error: firebaseStorage.StorageError) => {}
  ): Result {
    try {
      let result: Result;
      let tasks: firebaseStorage.UploadTask[] = [];
      for (let parsedFile of parsedFiles) {
        result = this.writeFile(parsedFile, snapshotCallback, completeCallback, errorCallback);
        if (result.isNotSuccessful) {
          throw new Error(result.message);
        }
      }
      return new SuccessfulResult();
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public async deleteFile(filePath: string): Promise<Result> {
    try {
      const storage: firebaseStorage.FirebaseStorage = firebaseStorage.getStorage(
        firebaseApp.getApp(),
        ConfigurationReaders.nuxtConfigurationReader.FIREBASE_STORAGE_URL
      );
      await firebaseStorage.deleteObject(
        firebaseStorage.ref(storage, this._generateCompleteFilePath(filePath))
      );
      return new SuccessfulResult();
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  public async deleteFiles(filePaths: string[]): Promise<Result> {
    try {
      let result: Result;
      for (let filePath of filePaths) {
        result = await this.deleteFile(filePath);
        if (result.isNotSuccessful) {
          throw new Error(result.message);
        }
      }
      return new SuccessfulResult();
    } catch (error: any) {
      return new FailedResult(error.message);
    }
  }

  private _generateCompleteFilePath(filePath: string): string {
    return `${this._folderPath}/${filePath}`;
  }
}
