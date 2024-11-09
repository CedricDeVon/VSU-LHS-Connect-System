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
        this._collectionName = `${collectionName}`;
    }

    public get collectionName(): string {
        return this._generateCompleteCollectionPath();
    }

    public async createOneDocument(values: any, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleObjectArgumentValidation(values);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            await firestore.runTransaction(database, async (transaction: any) => {
                await firestore.addDoc(firestore.collection(database, this._generateCompleteCollectionPath(collectionName)), values);
            });
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async createOneDocumentWithId(id: string, values: any, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleObjectArgumentValidation(values);
            this._handleStringArgumentValidation(collectionName);

            console.log(id, values)
            const database = firestore.getFirestore(getApp());
            await firestore.runTransaction(database, async (transaction: any) => {
                await firestore.setDoc(firestore.doc(database, this._generateCompleteCollectionPath(collectionName), id), values);
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
                return await firestore.getDoc(firestore.doc(database, this._generateCompleteCollectionPath(collectionName), documentName));
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

            const result = await this.isDocumentFound(this._generateCompleteCollectionPath(collectionName), documentName);
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

            const result = await this.readOneDocument(this._generateCompleteCollectionPath(collectionName), documentName);
            return new SuccessfulResult(result.data === undefined);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async countCollectionDocuments(collectionName: string = this._collectionName, conditions: any = undefined): Promise<Result> {
        try {
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                const collection = firestore.collection(database, this._generateCompleteCollectionPath(collectionName));
                const query = firestore.query(collection, conditions);
                return (await firestore.getCountFromServer(query));
            });
            return new SuccessfulResult(result.data().count);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async updateOneDocument(documentName: string, values: any, collectionName: string = this._collectionName): Promise<Result> {
        try {
            this._handleObjectArgumentValidation(values);
            this._handleStringArgumentValidation(documentName);
            this._handleStringArgumentValidation(collectionName);

            const database = firestore.getFirestore(getApp());
            const result = await firestore.runTransaction(database, async (transaction: any) => {
                return await firestore.updateDoc(firestore.doc(database, this._generateCompleteCollectionPath(collectionName), documentName), values);
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
                await firestore.deleteDoc(firestore.doc(database, this._generateCompleteCollectionPath(collectionName), documentName));
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

    public async queryUniques(conditions: any = undefined): Promise<Result> {
        try {
            const database = firestore.getFirestore(getApp());
            const collection = firestore.collection(database, this._generateCompleteCollectionPath());
            const querySnapshot = await firestore.getDocs(firestore.query(collection, conditions));
            const data: any = {};
            querySnapshot.forEach((document) => {
                data[document.id] = document.data();
              });
            return new SuccessfulResult(data);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async queryOne(conditions: any = undefined): Promise<Result> {
        try {
            const database = firestore.getFirestore(getApp());
            const collection = firestore.collection(database, this._generateCompleteCollectionPath());
            const querySnapshot = await firestore.getDocs(firestore.query(collection, conditions));
            let data: any;
            querySnapshot.forEach((document) => {
                data = { id: document.id, ...document.data() };
              });
            return new SuccessfulResult(data);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public async queryDuplicates(conditions: any = undefined): Promise<Result> {
        try {
            const database = firestore.getFirestore(getApp());
            const collection = firestore.collection(database, this._generateCompleteCollectionPath());
            const querySnapshot = await firestore.getDocs(firestore.query(collection, conditions));
            const data: any = [];
            querySnapshot.forEach((document) => {
                data.push({ id: document.id, data: document.data()});
              });
            return new SuccessfulResult(data);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
    
    private _generateCompleteCollectionPath(collectionName: string = this._collectionName): string {
        return `${ConfigurationReaders.nuxtConfigurationReader.ENVIRONMENT_NAME}-${collectionName}`;
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

