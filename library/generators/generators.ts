import { UUIDV4Generator } from '~/library/generators/uuidV4Generator';
import { IncidentIdGenerator } from '~/library/generators/incidentIdGenerator';
import { AnecdotalIdGenerator } from '~/library/generators/anecdotalIdGenerator';
import { RandomNumberGenerator } from '~/library/generators/randomNumberGenerator';
import { CaseConferenceIdGenerator } from '~/library/generators/caseConferenceIdGenerator';
import { IncidentReportIdGenerator } from '~/library/generators/incidentReportIdGenerator';
import { AnecdotalReportIdGenerator } from '~/library/generators/anecdotalReportIdGenerator';
import { CurrentAcademicYearGenerator } from '~/library/generators/currentAcademicYearGenerator';

export class Generators {
    public static readonly uuidV4Generator: UUIDV4Generator = new UUIDV4Generator();

    public static readonly incidentIdGenerator: IncidentIdGenerator = new IncidentIdGenerator();

    public static readonly anecdotalIdGenerator: AnecdotalIdGenerator = new AnecdotalIdGenerator();

    public static readonly randomNumberGenerator: RandomNumberGenerator = new RandomNumberGenerator();

    public static readonly caseConferenceIdGenerator: CaseConferenceIdGenerator = new CaseConferenceIdGenerator();

    public static readonly incidentReportIdGenerator: IncidentReportIdGenerator = new IncidentReportIdGenerator();

    public static readonly anecdotalReportIdGenerator: AnecdotalReportIdGenerator = new AnecdotalReportIdGenerator();

    public static readonly currentAcademicYearGenerator: CurrentAcademicYearGenerator = new CurrentAcademicYearGenerator();
}
