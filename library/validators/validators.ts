import { EmailValidator } from "./emailValidator";
import { EmptyValidator } from "./emptyValidator";
import { GenderValidator } from "./genderValidator";
import { PasswordValidator } from "./passwordValidator";
import { PastDateValidator } from "./pastDateValidator";
import { SmallTextValidator } from "./smallTextValidator";
import { LargeTextValidator } from "./largeTextValidator";
import { PersonNameValidator } from "./personNameValidator";
import { MediumTextValidator } from "./mediumTextValidator";
import { FutureDateValidator } from "./futureDateValidator";
import { PhoneNumberValidator } from "./phoneNumberValidator";
import { AcademicYearValidator } from "./academicYearValidator";
import { StudentGradeValidator } from "./studentGradeValidator";
import { AdviserStatusValidator } from "./adviserStatusValidator";
import { IncidentStatusValidator } from "./incidentStatusValidator";
import { CaseConferenceStatusValidator } from "./caseConferenceStatusValidator";
import { InitialIncidentStatusValidator } from "./initialIncidentStatusValidator";

export class Validators {
    public static readonly emailValidator: EmailValidator = new EmailValidator();

    public static readonly emptyValidator: EmptyValidator = new EmptyValidator();

    public static readonly genderValidator: GenderValidator = new GenderValidator();

    public static readonly passwordValidator: PasswordValidator = new PasswordValidator();
    
    public static readonly pastDateValidator: PastDateValidator = new PastDateValidator();
    
    public static readonly largeTextValidator: LargeTextValidator = new LargeTextValidator();

    public static readonly smallTextValidator: SmallTextValidator = new SmallTextValidator();
    
    public static readonly personNameValidator: PersonNameValidator = new PersonNameValidator();
    
    public static readonly futureDateValidator: FutureDateValidator = new FutureDateValidator();
    
    public static readonly mediumTextValidator: MediumTextValidator = new MediumTextValidator();
    
    public static readonly phoneNumberValidator: PhoneNumberValidator = new PhoneNumberValidator();

    public static readonly studentGradeValidator: StudentGradeValidator = new StudentGradeValidator();
    
    public static readonly academicYearValidator: AcademicYearValidator = new AcademicYearValidator();

    public static readonly adviserStatusValidator: AdviserStatusValidator = new AdviserStatusValidator();
    
    public static readonly incidentStatusValidator: IncidentStatusValidator = new IncidentStatusValidator();

    public static readonly caseConferenceStatusValidator: CaseConferenceStatusValidator = new CaseConferenceStatusValidator();
    
    public static readonly initialIncidentStatusValidator: InitialIncidentStatusValidator = new InitialIncidentStatusValidator();
}

