import { FailedResult } from "../results/failedResult";
import type { Result } from "../results/result";
import { SuccessfulResult } from "../results/successfulResult";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

export class UserSecurity {
    public static async logInUser(data: any): Promise<Result> {
        try {
            if (data === undefined || data === null) {
                throw new Error('Attributes must neither be undefined or null')
            }

            const { auth, email, password, role } = data;
            await signInWithEmailAndPassword(auth, email, password);
            const firebaseCurrentUser = await getCurrentUser();
            const result: any = await $fetch(`/api/auth/logIn/${role}/${firebaseCurrentUser.uid}`);
            if (result.isNotSuccessful) {
                throw new Error(result.message)
            }
            return new SuccessfulResult(result.data);

        } catch (error: any) {
            return UserSecurity._handleFailedResult(error);
        }
    }

    public static async signUpUserViaStep1(data: any): Promise<Result> {
        
    }

    public static async signOutUser(auth: any): Promise<Result> {
        try {
            if (auth === undefined || auth === null) {
                throw new Error('Cannot Sign-out user')
            }

            await signOut(auth);
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

        return new FailedResult(error.message);
    }
}
