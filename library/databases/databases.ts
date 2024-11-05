import { FirebaseStorage } from "./firebaseStorage";
import { FirebaseDatabase } from "./firebaseDatabase";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { where } from "firebase/firestore";

export class Databases {
    private static readonly _userFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('user');

    private static readonly _adminFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('admin');

    private static readonly _userIconsFirebaseStorage: FirebaseStorage = new FirebaseStorage('users/icons');

    private static readonly _incidentalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/incidents');

    private static readonly _anecdotalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/anecdotals');

    private static readonly _caseConferenceFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/caseConferences');

    public static get userFirebaseDatabase(): FirebaseDatabase {
        return Databases._userFirebaseDatabase;
    }

    public static get adminFirebaseDatabase(): FirebaseDatabase {
        return Databases._adminFirebaseDatabase;
    }

    public static get userIconsFirebaseStorage(): FirebaseStorage {
        return Databases._userIconsFirebaseStorage;
    }

    public static get incidentalReportsFirebaseStorage(): FirebaseStorage {
        return Databases._incidentalReportsFirebaseStorage;
    }

    public static get anecdotalReportsFirebaseStorage(): FirebaseStorage {
        return Databases._anecdotalReportsFirebaseStorage;
    }

    public static get caseConferenceFirebaseStorage(): FirebaseStorage {
        return Databases._caseConferenceFirebaseStorage;
    }

    public static async getUser(email: string): Promise<Result> {
        try {
            const result: Result = await Databases._userFirebaseDatabase.queryOne(
                where("email", "==", email)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error);
        }
    }
}
