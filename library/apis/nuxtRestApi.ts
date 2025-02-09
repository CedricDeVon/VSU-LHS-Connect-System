import { Databases } from '~/library/databases/databases';
import { FailedResult } from '~/library/results/failedResult';
import { SuccessfulResult } from '~/library/results/successfulResult';
import { Cryptographers } from '~/library/cryptographers/cryptographers';
import { Benchmarkers } from '../benchmarkers/benchmarkers';

export class NuxtRestApi {
    private _idempotencyKeys: Set<string>;

    public constructor() {
        this._idempotencyKeys = new Set<string>();
    }

    public async anonymousSupabaseUser(event: any): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);

            let client: any = await Databases.supabaseDatabase.createServerClient(event);
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }

            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }   
    }

    public async authenticateSupabaseUserViaJsonWebToken(
        event: any, jsonWebToken: any ): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);

            let client: any = await Databases.supabaseDatabase.createServerClient(event);
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            const jsonWebTokenResult = Cryptographers.jsonWebTokenCryptographer.verify(jsonWebToken);
            if (!jsonWebTokenResult.isSuccessful) {
                return jsonWebTokenResult.toObjectWithMerge({ status: 401 });
            }
            const authenticationResult: any = await client.data.auth.signInWithPassword({
                email: jsonWebTokenResult.data.email, password: jsonWebTokenResult.data.password,
            })
            if (authenticationResult.error) {
                return new FailedResult(authenticationResult.error).toObjectWithMerge({ status: authenticationResult.status || 500 });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async readOne(
        event: any,
        client: any,
        databaseTableName: string,
        routerParameters: any,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);
            NuxtRestApi._throwIfUndefinedOrNull(client);
            NuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            NuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            client = Databases.supabaseDatabase.fromBaseSchemaTable(client, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = Databases.supabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = client.data;
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter]);
            }
            client = callback(client);
            client = client.eq('is_hidden', false);
            client = (await Databases.supabaseDatabase.executeServerClient(client)).data;

            if (!client.data) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async readMany(
        event: any,
        client: any,
        databaseTableName: string,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);
            NuxtRestApi._throwIfUndefinedOrNull(client);
            NuxtRestApi._throwIfUndefinedOrNull(databaseTableName);

            client = Databases.supabaseDatabase.fromBaseSchemaTable(client, databaseTableName);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = Databases.supabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = Databases.supabaseDatabase.parseQueryStringParameterOrderedColumns(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = Databases.supabaseDatabase.parseQueryStringParameterSelectedRowRange(client.data, queryStringParameters);
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 });
            }
            client = callback(client);
            client = client.data;
            client = client.eq('is_hidden', false);
            client = (await Databases.supabaseDatabase.executeServerClient(client)).data;
            
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
        event: any,
        client: any,
        databaseTableName: string,
        routerParameters: any,
        bodyParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            if (this._idempotencyKeys.has(idempotencyKey)) {
                return new FailedResult("REST API is still busy").toObjectWithMerge({ status: 429 });
            }
            this._idempotencyKeys.add(idempotencyKey);

            NuxtRestApi._throwIfUndefinedOrNull(idempotencyKey);
            NuxtRestApi._throwIfUndefinedOrNull(event);
            NuxtRestApi._throwIfUndefinedOrNull(client);
            NuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            NuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            client = Databases.supabaseDatabase.fromBaseSchemaTable(client, databaseTableName);
            if (!client.isSuccessful) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: 400 }));
            }
            client = client.data;
            client = client.insert({
                ...routerParameters,
                ...bodyParameters['data'],
                timestamp_created: new Date().toISOString(),
                timestamp_modified: new Date().toISOString(),
                is_hidden: false
            });
            client = callback(client);
            client = client.select();
            client = (await Databases.supabaseDatabase.executeServerClient(client)).data;
            if (client.status !== 204) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: client.status }));
            }
            return this._handleIdempotentResult(idempotencyKey, new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 }));

        } catch (error: any) {
            return this._handleIdempotentResult(idempotencyKey, new FailedResult(error.message).toObjectWithMerge({ status: 500 }));
        }
    }

    public async updateOne(
        event: any,
        client: any,
        databaseTableName: string,
        routerParameters: any,
        bodyParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);
            NuxtRestApi._throwIfUndefinedOrNull(client);
            NuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            NuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            client = Databases.supabaseDatabase.fromBaseSchemaTable(client, databaseTableName);
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
            client = (await Databases.supabaseDatabase.executeServerClient(client)).data;
            if (client.status !== 204) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status });
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 });

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 });
        }
    }

    public async deleteOne(
        event: any,
        client: any,
        databaseTableName: string,
        routerParameters: any,
        callback: any = (client: any): any => { return client; }): Promise<any> {
        try {
            NuxtRestApi._throwIfUndefinedOrNull(event);
            NuxtRestApi._throwIfUndefinedOrNull(client);
            NuxtRestApi._throwIfUndefinedOrNull(databaseTableName);
            NuxtRestApi._throwIfUndefinedOrNull(routerParameters);

            client = Databases.supabaseDatabase.fromBaseSchemaTable(client, databaseTableName);
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
            client = (await Databases.supabaseDatabase.executeServerClient(client)).data;
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
