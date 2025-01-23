// import { FirebaseStorage } from "./firebaseStorage";
// import { FirebaseDatabase } from "./firebaseDatabase";
// import type { Result } from "../results/result";
// import { FailedResult } from "../results/failedResult";
// import { SuccessfulResult } from "../results/successfulResult";
// import { where, and, or } from "firebase/firestore";

// export class Databases {
//     private static readonly _userFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('user');

//     private static readonly _adminFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('admin');

//     private static readonly _adviserFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('adviser');

//     private static readonly _sectionFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('section');

//     private static readonly _userIconsFirebaseStorage: FirebaseStorage = new FirebaseStorage('users/icons');

//     private static readonly _incidentalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/incidents');

//     private static readonly _anecdotalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/anecdotals');

//     private static readonly _caseConferenceFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/caseConferences');

//     public static get userFirebaseDatabase(): FirebaseDatabase {
//         return Databases._userFirebaseDatabase;
//     }

//     public static get adviserFirebaseDatabase(): FirebaseDatabase {
//         return Databases._adviserFirebaseDatabase;
//     }

//     public static get sectionFirebaseDatabase(): FirebaseDatabase {
//         return Databases._sectionFirebaseDatabase;
//     }

//     public static get adminFirebaseDatabase(): FirebaseDatabase {
//         return Databases._adminFirebaseDatabase;
//     }

//     public static get userIconsFirebaseStorage(): FirebaseStorage {
//         return Databases._userIconsFirebaseStorage;
//     }

//     public static get incidentalReportsFirebaseStorage(): FirebaseStorage {
//         return Databases._incidentalReportsFirebaseStorage;
//     }

//     public static get anecdotalReportsFirebaseStorage(): FirebaseStorage {
//         return Databases._anecdotalReportsFirebaseStorage;
//     }

//     public static get caseConferenceFirebaseStorage(): FirebaseStorage {
//         return Databases._caseConferenceFirebaseStorage;
//     }

//     public static async getUser(email: string): Promise<Result> {
//         try {
//             const result: Result = await Databases._userFirebaseDatabase.queryOne(
//                 where("email", "==", email)
//             );
//             if (result.isNotSuccessful) {
//                 throw new Error(result.message);
//             }
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }
    
//     public static async getSectionViaName(name: string): Promise<Result> {
//         try {
//             const result: Result = await Databases._adminFirebaseDatabase.queryOne(
//                 where("name", "==", name)
//             );
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }

//     public static async getAdminViaUserId(userId: string): Promise<Result> {
//         try {
//             const result: Result = await Databases._adminFirebaseDatabase.queryOne(
//                 where("userId", "==", userId)
//             );
//             if (result.isNotSuccessful) {
//                 throw new Error(result.message);
//             }
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }

//     public static async getAdviserViaUserId(userId: string): Promise<Result> {
//         try {
//             const result: Result = await Databases._adviserFirebaseDatabase.queryOne(
//                 where("userId", "==", userId)
//             );
//             if (result.isNotSuccessful) {
//                 throw new Error(result.message);
//             }
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }

//     public static async getAllStudentsCount(): Promise<Result> {
//         try {
//             const result: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('student')
//             if (result.isNotSuccessful) {
//                 throw new Error(result.message);
//             }
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }

//     public static async getAllAdminReportsCount(adminId: string): Promise<Result> {
//         try {
//             const anecdotalReportResult: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('anecdotalReport',
//                 where("adminId", "==", adminId)
//             );
//             if (anecdotalReportResult.isNotSuccessful) {
//                 throw new Error(anecdotalReportResult.message);
//             }
//             const incidentalReportResult: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('incidentReport',
//                 where("adminId", "==", adminId)
//             );
//             if (incidentalReportResult.isNotSuccessful) {
//                 throw new Error(incidentalReportResult.message);
//             }
//             return new SuccessfulResult(anecdotalReportResult.data + incidentalReportResult.data);

//         } catch (error: any) {
//             return new FailedResult(error);
//         }

//     }

//     public static async getAllPendingAdvisersCount(): Promise<Result> {
//         try {
//             const result: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('adviser',
//                 where("status", "==", false)
//             );
//             if (result.isNotSuccessful) {
//                 throw new Error(result.message);
//             }
//             return result;

//         } catch (error: any) {
//             return new FailedResult(error);
//         }
//     }
// }
