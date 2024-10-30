import { FirebaseDatabase } from "./firebaseDatabase";
import { FirebaseStorage } from "./firebaseFileSystem";

export class Databases {
    private static readonly _firebaseDatabase: FirebaseDatabase = new FirebaseDatabase();

    private static readonly _firebaseStorage: FirebaseStorage = new FirebaseStorage();

    public static get firebaseDatabase(): FirebaseDatabase {
        return Databases._firebaseDatabase;
    }

    public static get firebaseStorage(): FirebaseStorage {
        return Databases._firebaseStorage;
    }
}
