import { FirebaseStorage } from "./firebaseStorage";
import { FirebaseDatabase } from "./firebaseDatabase";

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
}
