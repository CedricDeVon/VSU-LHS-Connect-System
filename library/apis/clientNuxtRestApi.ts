import { FailedResult } from '~/library/results/failedResult';
import { Benchmarkers } from '../benchmarkers/benchmarkers';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { ClientSupabaseDatabase } from '../databases/clientSupabaseDatabase';

export class ClientNuxtRestApi {
    private _idempotencyKeys: Set<string>;

    public readonly clientSupabaseDatabase: ClientSupabaseDatabase;

    public constructor() {
        this._idempotencyKeys = new Set<string>();
        this.clientSupabaseDatabase = new ClientSupabaseDatabase();;
    }

    public async getUser(): Promise<any> {
        try {
            return new SuccessfulResult(useSupabaseUser().value).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async getAnonymousSupabaseUserClient(): Promise<any> {
        try {
            let client: any = this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }

            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }   
    }

    public async getAuthenticateSupabaseUserViaEmailAndPassword(email: any, password: any): Promise<any> {
        try {
            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            const authenticationResult: any = await client.data.auth.signInWithPassword({ email, password })
            if (authenticationResult.error) {
                return new FailedResult(authenticationResult.error).toObjectWithMerge({ status: authenticationResult.status || 500 });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async createSupabaseUserViaEmailAndPassword(email: any, password: any): Promise<any> {
        try {
            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            const { data: signUpData, error } = await client.data.auth.signUp({ email, password })
            if (error) {
                return new FailedResult(error).toObjectWithMerge({ status: error.status });
            }
            return new SuccessfulResult(signUpData).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }


    public async readOne(
        databaseTableName: string,
        routerParameters: any,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            ClientNuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            ClientNuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = client.data;
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter]);
            }
            client = callback(client);
            client = client.eq('is_hidden', false);
            client = (await this.clientSupabaseDatabase.executeClient(client)).data;

            if (!client.data) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async readMany(
        databaseTableName: string,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            ClientNuxtRestApi._throwIfUndefinedOrNull(databaseTableName);

            let client: any = this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.parseQueryStringParameterOrderedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.parseQueryStringParameterSelectedRowRange(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = callback(client);
            client = client.data;
            client = client.eq('is_hidden', false);
            client = (await this.clientSupabaseDatabase.executeClient(client)).data;
            
            if (!client.data) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async createOne(
        idempotencyKey: string,
        databaseTableName: string,
        bodyParameters: any = {},
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            if (this._idempotencyKeys.has(idempotencyKey)) {
                return new FailedResult("REST API is still busy").toObjectWithMerge({ status: 429 });
            }
            this._idempotencyKeys.add(idempotencyKey);

            ClientNuxtRestApi._throwIfUndefinedOrNull(idempotencyKey);
            ClientNuxtRestApi._throwIfUndefinedOrNull(databaseTableName);

            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName);
            if (!client.isSuccessful) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: 400 }));
            }
            client = client.data;
            client = client.insert({
                ...bodyParameters['data'],
                timestamp_created: new Date().toISOString(),
                timestamp_modified: new Date().toISOString(),
                is_hidden: false
            });
            client = callback(client);
            client = client.select();
            client = (await this.clientSupabaseDatabase.executeClient(client)).data;
            if (client.status !== 201) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: client.status }));
            }
            return this._handleIdempotentResult(idempotencyKey, new SuccessfulResult(client.data).toObjectWithMerge({ status: 201 }));

        } catch (error: any) {
            return this._handleIdempotentResult(idempotencyKey, new FailedResult(error.message).toObjectWithMerge({ status: 500 }));
        }
    }

    public async updateOne(
        databaseTableName: string,
        routerParameters: any,
        bodyParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            ClientNuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            ClientNuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = client.data;
            client = client.update({ ...bodyParameters['data'], timestamp_modified: new Date().toISOString() });
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter]);
            }
            client = callback(client);
            client = client.select();
            client = (await this.clientSupabaseDatabase.executeClient(client)).data;
            if (client.status !== 204) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async deleteOne(
        databaseTableName: string,
        routerParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            ClientNuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            ClientNuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            let client: any = await this.clientSupabaseDatabase.getClient();
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = this.clientSupabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = client.data;
            client = client.update({ is_hidden: true });
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter]);
            }
            client = callback(client);
            client = client.select();
            client = (await this.clientSupabaseDatabase.executeClient(client)).data;
            if (client.status !== 204) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    private _handleIdempotentResult(idempotencyKey: string, result: any): any {
        this._idempotencyKeys.delete(idempotencyKey);
        return result;
    }

    private static _throwIfUndefinedOrNull(value: any): void {
        if (value === undefined || value === null) {
            throw new Error('undefined or null values are invalid');
        }
    }
}
