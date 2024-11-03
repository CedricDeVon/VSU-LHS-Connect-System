import { getApp } from 'firebase/app';
import { useCollection } from 'vuefire';
import * as firestore from 'firebase/firestore';

import { Database } from "./database";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { ConfigurationReaders } from '../configurationReaders/configurationReaders';

export class FirebaseDatabase extends Database {
    private readonly _collectionName: string;

    public constructor(collectionName: string) {
        super();
        
        this._handleStringArgumentValidation(collectionName);
        this._collectionName = `${ConfigurationReaders.nuxtConfigurationReader.ENVIRONMENT_NAME}-${collectionName}`;
    }

    public get collectionName(): string {
        return this._collectionName;
    }

    public async createOneDocument(values: {}, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleObjectArgumentValidation(values);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            await firestore.runTransaction(database, async (transaction: any) => {
                await firestore.addDoc(firestore.collection(database, collectionName), values);
            });
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async readOneDocument(documentName: string, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                return await firestore.getDoc(firestore.doc(database, collectionName, documentName));
            });
            return new SuccessfulResult(result);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async isDocumentNotFound(documentName: string, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const result = await this.isDocumentFound(collectionName, documentName);
            if (result.isNotSuccessful) {
                return result;
            }
            return new SuccessfulResult(result.data === false)

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async isDocumentFound(documentName: string, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const result = await this.readOneDocument(collectionName, documentName);
            return new SuccessfulResult(result.data === undefined);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async countCollectionDocuments(collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                return await firestore.getCountFromServer(firestore.collection(database, collectionName));
            });
            return new SuccessfulResult(result.data().count);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async readManyDocuments(collectionName: string = this._collectionName): Promise<Result> {
        try {
            if (collectionName === undefined || collectionName === null || collectionName === '') {
                throw new Error('Argument(s) must neither be undefined or null');
            }

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                return await firestore.getDocs(firestore.collection(database, collectionName));
            });
            return new SuccessfulResult(result);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async updateOneDocument(documentName: string, values: {}, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleObjectArgumentValidation(values);
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                return await firestore.updateDoc(firestore.doc(database, collectionName, documentName), values);
            });
            return new SuccessfulResult(result);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async deleteOneDocument(documentName: string, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            await firestore.runTransaction(database, async (transaction: any) => {
                await firestore.deleteDoc(firestore.doc(database, collectionName, documentName));
            });
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async terminateDatabase(): Promise<Result> {
        try {
            const database = firestore.getFirestore(getApp());
            await firestore.terminate(database);
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async query(callback: Function): Promise<Result> {
        try {
            return await callback();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    private _handleStringArgumentValidation(value: string): void {
        if (value === undefined || value === null || value === '') {
            throw new Error('Argument(s) must be a non-empty string');
        }
    }

    private _handleObjectArgumentValidation(value: {}): void {
        if (value === undefined || value === null || typeof value !== 'object') {
            throw new Error('Argument(s) must be an object');
        }
    }
}

