import { where, orderBy } from "firebase/firestore";

import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";
import { FirebaseStorage } from "./firebaseStorage";
import { FirebaseDatabase } from "./firebaseDatabase";

export class Databases {
    private static readonly _adminFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('admin');
    
    private static readonly _adviserFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('adviser');
    
    private static readonly _anecdotalDividerFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('anecdotalDivider');
    
    private static readonly _anecdotalReportFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('anecdotalReport');
    
    private static readonly _announcementDividerFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('announcementDivider');
    
    private static readonly _announcementFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('announcement');
    
    private static readonly _caseConferenceFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('caseConference');
    
    private static readonly _incidentDividerFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('incidentDivider');
    
    private static readonly _incidentReportFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('incidentReport');
    
    private static readonly _sectionFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('section');
    
    private static readonly _studentFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('student');
    
    private static readonly _timelineFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('timeline');
    
    private static readonly _userFirebaseDatabase: FirebaseDatabase = new FirebaseDatabase('user');
    
    private static readonly _userIconsFirebaseStorage: FirebaseStorage = new FirebaseStorage('users/icons');
    
    private static readonly _anecdotalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/anecdotals');

    private static readonly _incidentalReportsFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/incidents');

    private static readonly _caseConferenceFirebaseStorage: FirebaseStorage = new FirebaseStorage('reports/caseConferences');

    public static get anecdotalDividerFirebaseDatabase(): FirebaseDatabase {
        return Databases._anecdotalDividerFirebaseDatabase;
    }
    
    public static get anecdotalReportFirebaseDatabase(): FirebaseDatabase {
        return Databases._anecdotalReportFirebaseDatabase;
    }
    
    public static get announcementDividerFirebaseDatabase(): FirebaseDatabase {
        return Databases._announcementDividerFirebaseDatabase;
    }
    
    public static get announcementFirebaseDatabase(): FirebaseDatabase {
        return Databases._announcementFirebaseDatabase;
    }
    
    public static get caseConferenceFirebaseDatabase(): FirebaseDatabase {
        return Databases._caseConferenceFirebaseDatabase;
    }
    
    public static get incidentDividerFirebaseDatabase(): FirebaseDatabase {
        return Databases._incidentDividerFirebaseDatabase;
    }
    
    public static get incidentReportFirebaseDatabase(): FirebaseDatabase {
        return Databases._incidentReportFirebaseDatabase;
    }
    
    public static get userFirebaseDatabase(): FirebaseDatabase {
        return Databases._userFirebaseDatabase;
    }

    public static get adviserFirebaseDatabase(): FirebaseDatabase {
        return Databases._adviserFirebaseDatabase;
    }

    public static get studentFirebaseDatabase(): FirebaseDatabase {
        return Databases._studentFirebaseDatabase;
    }

    public static get sectionFirebaseDatabase(): FirebaseDatabase {
        return Databases._sectionFirebaseDatabase;
    }

    public static get adminFirebaseDatabase(): FirebaseDatabase {
        return Databases._adminFirebaseDatabase;
    }

    public static get timelineFirebaseDatabase(): FirebaseDatabase {
        return Databases._timelineFirebaseDatabase;
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

    public static async getAllIncidentReportsViaFacultyId(facultyId: string): Promise<Result> {
        try {
            const result: Result = await Databases._incidentReportFirebaseDatabase.queryDuplicates(
                where("facultyId", "==", facultyId)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllStudentsViaSectionId(sectionId: string): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.queryDuplicates(
                where("sectionId", "==", sectionId)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneAdviserViaSectionId(sectionId: string): Promise<Result> {
        try {
            const result: Result = await Databases._adviserFirebaseDatabase.queryOne(
                where("sectionId", "==", sectionId)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async createOneSection(id: string, name: string, level: number, schoolYear: string): Promise<Result> {
        try {
            let result: Result = await Databases._sectionFirebaseDatabase.createOneDocumentWithId(id, {
                name, level, schoolYear
            });
            console.log(result);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
    public static async getAllIncidentalReports(): Promise<Result> {
        try {
            const result: Result = await Databases._incidentReportFirebaseDatabase.queryDuplicates();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
    
    public static async getAllIncidentalReportDividers(): Promise<Result> {
        try {
            const result: Result = await Databases._incidentDividerFirebaseDatabase.queryDuplicates();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllSections(): Promise<Result> {
        try {
            const result: Result = await Databases._sectionFirebaseDatabase.queryDuplicates();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getManyStudentsViaSectionId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.queryDuplicates(
                where('sectionId', '==', id)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneSectionViaName(name: string): Promise<Result> {
        try {
            const result: Result = await Databases._sectionFirebaseDatabase.queryOne(
                where("name", "==", name)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneSectionViaId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._sectionFirebaseDatabase.readOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async deleteOneSectionViaId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._sectionFirebaseDatabase.deleteOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getMostRecentTimeline(): Promise<Result> {
        try {
            let result: Result = await Databases._timelineFirebaseDatabase.queryDuplicatesWithMultipleConditions(
               orderBy('schoolYear', 'desc')
            );
            if (result.isNotSuccessful) {
                throw new Error(result.message);
            }
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async areAllAdviserEmailsNotFound(adviserEmails: string[]): Promise<Result> {
        try {
            let result: Result;
            for (const adviserEmail of adviserEmails) {
                result = await Databases.getOneUserViaEmail(adviserEmail);
                console.log(result)
                if (result.data !== undefined) {
                    throw new Error(`Adviser '${adviserEmail}' already exists`);
                }
            }
            return new SuccessfulResult();

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async updateAdviserStatusToActiveViaId(id: string): Promise<Result> {
        try {
            let result: Result = await Databases._adviserFirebaseDatabase.updateOneDocument(id, { status: 'active' });
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async deleteAdviserViaId(id: string): Promise<Result> {
        try {
            let result: Result = await Databases._adviserFirebaseDatabase.deleteOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllUsers(): Promise<Result> {
        try {
            const result: Result = await Databases._userFirebaseDatabase.queryUniques();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneUserViaEmail(email: string): Promise<Result> {
        try {
            const result: Result = await Databases._userFirebaseDatabase.queryOne(
                where("email", "==", email)
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneUserViaId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._userFirebaseDatabase.readOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async updateOneUserViaId(id: string, values: any): Promise<Result> {
        try {
            let result: Result = await Databases._userFirebaseDatabase.updateOneDocument(id, values);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async deleteOneUserViaId(id: string): Promise<Result> {
        try {
            let result: Result = await Databases._userFirebaseDatabase.deleteOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllAdvisers(): Promise<Result> {
        try {
            const result: Result = await Databases._adviserFirebaseDatabase.queryDuplicates();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneAdviserViaUserId(userId: string): Promise<Result> {
        try {
            const result: Result = await Databases._adviserFirebaseDatabase.queryOne(
                where("userId", "==", userId)
            );
            if (result.data === undefined) {
                throw new Error(`User does not have an 'Adviser' account`);
            }
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async updateOneAdviserViaId(id: string, values: any): Promise<Result> {
        try {
            let result: Result = await Databases._adviserFirebaseDatabase.updateOneDocument(id, values);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async deleteOneAdviserViaId(id: string): Promise<Result> {
        try {
            let result: Result = await Databases._adviserFirebaseDatabase.deleteOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllStudents(): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.queryDuplicates();
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneStudentViaId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.readOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async updateOneStudentViaId(id: string, values: any): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.updateOneDocument(id, values);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async deleteOneStudentViaId(id: string): Promise<Result> {
        try {
            const result: Result = await Databases._studentFirebaseDatabase.deleteOneDocument(id);
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getOneAdminViaUserId(userId: string): Promise<Result> {
        try {
            const result: Result = await Databases._adminFirebaseDatabase.queryOne(
                where("userId", "==", userId)
            );
            if (result.data === undefined) {
                throw new Error(`User does not have an 'Admin' account`);
            }
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllStudentsCount(): Promise<Result> {
        try {
            const result: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('student')
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllAdminReportsCount(adminId: string): Promise<Result> {
        try {
            const anecdotalReportResult: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('anecdotalReport',
                where("adminId", "==", adminId)
            );
            if (anecdotalReportResult.isNotSuccessful) {
                throw new Error(anecdotalReportResult.message);
            }
            const incidentalReportResult: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('incidentReport',
                where("adminId", "==", adminId)
            );
            if (incidentalReportResult.isNotSuccessful) {
                throw new Error(incidentalReportResult.message);
            }
            return new SuccessfulResult(anecdotalReportResult.data + incidentalReportResult.data);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }

    public static async getAllPendingAdvisersCount(): Promise<Result> {
        try {
            const result: Result = await Databases._adminFirebaseDatabase.countCollectionDocuments('adviser',
                where("status", "==", "pending")
            );
            return result;

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
