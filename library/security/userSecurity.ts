import type { IFile } from "../files/iFile";
import { FailedResult } from "../results/failedResult";
import type { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

export class UserSecurity {
    public static async logInUser(data: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(data);

            const { auth, email, password, role } = data;
            await signInWithEmailAndPassword(auth, email, password);
            const firebaseCurrentUser = await getCurrentUser();
            const result: any = await $fetch(`/api/auth/logIn/${role}/${firebaseCurrentUser.uid}`);
            if (result.isNotSuccessful) {
                throw new Error(result.message)
            }
            const jsonWebToken: any = await $fetch('/api/auth/jsonWebToken/sign', {
                method: 'POST', body: {
                    id: firebaseCurrentUser.uid,
                    username: result.data.username,
                    email,
                    password,
                    status: result.data.status,
                    role
                }
              });
            window.localStorage!.setItem('userAuthToken',
                jsonWebToken.data
            );
            return new SuccessfulResult(result.data);

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signUpUserViaStep1(data: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(data);

            const result: any = await $fetch('/api/auth/signUp/adviser/step1', {
                method: 'POST', body: data
            });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }

            return new SuccessfulResult();

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signUpUserViaStep2(data: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(data);

            const result: any = await $fetch('/api/auth/signUp/adviser/step2', {
                method: 'POST', body: data
            });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }

            return new SuccessfulResult();

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signUpUser(data: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(data);

            await createUserWithEmailAndPassword(data.auth, data.email, data.password);
            const firebaseCurrentUser = await getCurrentUser();
            const result: any = await $fetch('/api/auth/signUp/adviser', {
                method: 'POST', body: {
                    id: firebaseCurrentUser.uid, ...data
                }
            });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            return new SuccessfulResult();

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signUpManyUsersViaCSVFile(file: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(file);

            const result: any = await $fetch('/api/auth/signUp/advisers', {
                method: 'POST', body: { file }
            });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            return new SuccessfulResult();
            /*
            parse csv /
            check if adviser email is found '
            auth signup
            firebase signup
            */

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async deleteAdviser(auth: any, data: { userId: string, adviserId: string} ): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(auth);
            UserSecurity._handleUndefinedOrNullArguments(data);

            const { userId, adviserId } = data;
            const result: any = await $fetch('/api/adviser/request/reject', {
                method: 'POST', body: { userId, adviserId }
              });
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            await auth.deleteUser(userId);
            return new SuccessfulResult();

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signOutUser(auth: any): Promise<Result> {
        try {
            UserSecurity._handleUndefinedOrNullArguments(auth);

            await signOut(auth);
            window.localStorage?.removeItem('userAuthToken');
            return new SuccessfulResult();

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    private static _handleFailedResult(error: any): Result {
        if (error.code === 'auth/network-request-failed') {
            return new FailedResult("Please connect to a stable internet connection")
        }
        else if (error.code === 'auth/invalid-credential') {
            return new FailedResult("Both email and password do not match");
        }
        else if (error.code === 'auth/email-already-in-use') {
            return new FailedResult('Email already exists');
        }

        return new FailedResult(error.message);
    }

    private static _handleUndefinedOrNullArguments(value: any): void {
        if (value === undefined || value === null) {
            throw new Error('Attributes must neither be undefined or null')
        }
    }
}
