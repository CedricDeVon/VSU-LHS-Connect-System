import { EmptyValidator } from './emptyValidator';
import { FloatValidator } from './floatValidator';
import { NumberValidator } from './numberValidator';
import { BooleanValidator } from './booleanValidator';
import { NumberRangeValidator } from './numberRangeValidator';
import { FloatRangeValidator } from './floatRangeValidator';
import { PersonNameValidator } from './personNameValidator';
import { EmailValidator } from './emailValidator';
import { PasswordValidator } from './passwordValidator';
import { PhoneNumberValidator } from './phoneNumberValidator';
import { URLValidator } from './urlValidator';
import { DataURIValidator } from './dataURIValidator';
import { JSONValidator } from './jsonValidator';
import { JSONWebTokenValidator } from './jsonWebToken';

export class Validators {
    private static readonly _emptyValidator: EmptyValidator = new EmptyValidator();

    private static readonly _floatValidator: FloatValidator = new FloatValidator();
    
    private static readonly _numberValidator: NumberValidator = new NumberValidator();

    private static readonly _booleanValidator: BooleanValidator = new BooleanValidator();
    
    private static readonly _personAgeValidator: NumberRangeValidator = new NumberRangeValidator(0, 128);
    
    private static readonly _personNameValidator: PersonNameValidator = new PersonNameValidator();
    
    private static readonly _emailValidator: EmailValidator = new EmailValidator();
    
    private static readonly _passwordValidator: PasswordValidator = new PasswordValidator();

    private static readonly _phoneNumberValidator: PhoneNumberValidator = new PhoneNumberValidator();
    
    private static readonly _gradeValidator: FloatRangeValidator = new FloatRangeValidator(0, 100);
    
    private static readonly _urlValidator: URLValidator = new URLValidator();
    
    private static readonly _dataURIValidator: DataURIValidator = new DataURIValidator();

    private static readonly _jsonValidator: JSONValidator = new JSONValidator();
    
    private static readonly _jsonWebTokenValidator: JSONWebTokenValidator = new JSONWebTokenValidator();

    public static get emptyValidator(): EmptyValidator {
        return Validators._emptyValidator;
    }
    
    public static get floatValidator(): FloatValidator {
        return Validators._floatValidator;
    }
    
    public static get numberValidator(): NumberValidator {
        return Validators._numberValidator;
    }
    
    public static get booleanValidator(): BooleanValidator {
        return Validators._booleanValidator;
    }
    
    public static get personAgeValidator(): NumberRangeValidator {
        return Validators._personAgeValidator;
    }

    public static get personNameValidator(): PersonNameValidator {
        return Validators._personNameValidator;
    }

    public static get emailValidator(): EmailValidator {
        return Validators._emailValidator;
    }

    public static get passwordValidator(): PasswordValidator {
        return Validators._passwordValidator;
    }
    
    public static get phoneNumberValidator(): PhoneNumberValidator {
        return Validators._phoneNumberValidator;
    }

    public static get gradeValidator(): FloatRangeValidator {
        return Validators._gradeValidator;
    }

    public static get urlValidator(): URLValidator {
        return Validators._urlValidator;
    }

    public static get dataURIValidator(): DataURIValidator {
        return Validators._dataURIValidator;
    }
    
    public static get jsonValidator(): JSONValidator {
        return Validators._jsonValidator;
    }
    
    public static get jsonWebTokenValidator(): JSONWebTokenValidator {
        return Validators._jsonWebTokenValidator;
    }
}
