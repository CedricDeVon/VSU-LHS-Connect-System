import { describe, expect, it } from 'vitest'; 

import { Validators } from '../../../library/validators/validators';
import { EmailValidator } from "../../../library/validators/emailValidator";
import { EmptyValidator } from "../../../library/validators/emptyValidator";
import { GenderValidator } from "../../../library/validators/genderValidator";
import { PasswordValidator } from "../../../library/validators/passwordValidator";
import { PastDateValidator } from "../../../library/validators/pastDateValidator";
import { SmallTextValidator } from "../../../library/validators/smallTextValidator";
import { LargeTextValidator } from "../../../library/validators/largeTextValidator";
import { PersonNameValidator } from "../../../library/validators/personNameValidator";
import { MediumTextValidator } from "../../../library/validators/mediumTextValidator";
import { FutureDateValidator } from "../../../library/validators/futureDateValidator";
import { PhoneNumberValidator } from "../../../library/validators/phoneNumberValidator";
import { AcademicYearValidator } from "../../../library/validators/academicYearValidator";
import { StudentGradeValidator } from "../../../library/validators/studentGradeValidator";
import { AdviserStatusValidator } from "../../../library/validators/adviserStatusValidator";
import { IncidentStatusValidator } from "../../../library/validators/incidentStatusValidator";
import { CaseConferenceStatusValidator } from "../../../library/validators/caseConferenceStatusValidator";
import { InitialIncidentStatusValidator } from "../../../library/validators/initialIncidentStatusValidator";

describe('Validators Class', () => {
    it('emailValidator should be an instance of EmailValidator', () => {
        expect(Validators.emailValidator).toBeInstanceOf(EmailValidator);
    });

    it('emptyValidator should be an instance of EmptyValidator', () => {
        expect(Validators.emptyValidator).toBeInstanceOf(EmptyValidator);
    });

    it('genderValidator should be an instance of GenderValidator', () => {
        expect(Validators.genderValidator).toBeInstanceOf(GenderValidator);
    });

    it('passwordValidator should be an instance of PasswordValidator', () => {
        expect(Validators.passwordValidator).toBeInstanceOf(PasswordValidator);
    });

    it('pastDateValidator should be an instance of PastDateValidator', () => {
        expect(Validators.pastDateValidator).toBeInstanceOf(PastDateValidator);
    });

    it('largeTextValidator should be an instance of LargeTextValidator', () => {
        expect(Validators.largeTextValidator).toBeInstanceOf(LargeTextValidator);
    });

    it('smallTextValidator should be an instance of SmallTextValidator', () => {
        expect(Validators.smallTextValidator).toBeInstanceOf(SmallTextValidator);
    });

    it('personNameValidator should be an instance of PersonNameValidator', () => {
        expect(Validators.personNameValidator).toBeInstanceOf(PersonNameValidator);
    });

    it('futureDateValidator should be an instance of FutureDateValidator', () => {
        expect(Validators.futureDateValidator).toBeInstanceOf(FutureDateValidator);
    });

    it('mediumTextValidator should be an instance of MediumTextValidator', () => {
        expect(Validators.mediumTextValidator).toBeInstanceOf(MediumTextValidator);
    });

    it('phoneNumberValidator should be an instance of PhoneNumberValidator', () => {
        expect(Validators.phoneNumberValidator).toBeInstanceOf(PhoneNumberValidator);
    });

    it('studentGradeValidator should be an instance of StudentGradeValidator', () => {
        expect(Validators.studentGradeValidator).toBeInstanceOf(StudentGradeValidator);
    });

    it('academicYearValidator should be an instance of AcademicYearValidator', () => {
        expect(Validators.academicYearValidator).toBeInstanceOf(AcademicYearValidator);
    });

    it('adviserStatusValidator should be an instance of AdviserStatusValidator', () => {
        expect(Validators.adviserStatusValidator).toBeInstanceOf(AdviserStatusValidator);
    });

    it('incidentStatusValidator should be an instance of IncidentStatusValidator', () => {
        expect(Validators.incidentStatusValidator).toBeInstanceOf(IncidentStatusValidator);
    });

    it('caseConferenceStatusValidator should be an instance of CaseConferenceStatusValidator', () => {
        expect(Validators.caseConferenceStatusValidator).toBeInstanceOf(CaseConferenceStatusValidator);
    });

    it('initialIncidentStatusValidator should be an instance of InitialIncidentStatusValidator', () => {
        expect(Validators.initialIncidentStatusValidator).toBeInstanceOf(InitialIncidentStatusValidator);
    });
});
