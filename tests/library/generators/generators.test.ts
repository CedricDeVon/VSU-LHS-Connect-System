import { describe, it, expect } from 'vitest';

import { Generators } from '../../../library/generators/generators';
import { UUIDV4Generator } from '~/library/generators/uuidV4Generator';
import { RandomNumberGenerator } from '~/library/generators/randomNumberGenerator';
import { AnecdotalIdGenerator } from '~/library/generators/anecdotalIdGenerator';
import { IncidentIdGenerator } from '~/library/generators/incidentIdGenerator';
import { CaseConferenceIdGenerator } from '~/library/generators/caseConferenceIdGenerator';
import { AnecdotalReportIdGenerator } from '~/library/generators/anecdotalReportIdGenerator';
import { IncidentReportIdGenerator } from '~/library/generators/incidentReportIdGenerator';
import { CurrentAcademicYearGenerator } from '~/library/generators/currentAcademicYearGenerator';

describe('Generators', () => {
  it('should return an instance of UUIDV4Generator', () => {
    expect(Generators.uuidV4Generator).toBeInstanceOf(UUIDV4Generator);
  });

  it('should return an instance of RandomNumberGenerator', () => {
    expect(Generators.randomNumberGenerator).toBeInstanceOf(RandomNumberGenerator);
  });

  it('should return an instance of AnecdotalIdGenerator', () => {
    expect(Generators.anecdotalIdGenerator).toBeInstanceOf(AnecdotalIdGenerator);
  });

  it('should return an instance of IncidentIdGenerator', () => {
    expect(Generators.incidentIdGenerator).toBeInstanceOf(IncidentIdGenerator);
  });

  it('should return an instance of CaseConferenceIdGenerator', () => {
    expect(Generators.caseConferenceIdGenerator).toBeInstanceOf(CaseConferenceIdGenerator);
  });

  it('should return an instance of AnecdotalReportIdGenerator', () => {
    expect(Generators.anecdotalReportIdGenerator).toBeInstanceOf(AnecdotalReportIdGenerator);
  });

  it('should return an instance of IncidentReportIdGenerator', () => {
    expect(Generators.incidentReportIdGenerator).toBeInstanceOf(IncidentReportIdGenerator);
  });

  it('should return an instance of CurrentAcademicYearGenerator', () => {
    expect(Generators.currentAcademicYearGenerator).toBeInstanceOf(CurrentAcademicYearGenerator);
  });
});
