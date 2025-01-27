import { describe, it, expect } from "vitest";

import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { CaseConferenceIdGenerator } from "../../../library/generators/caseConferenceIdGenerator";

describe("CaseConferenceIdGenerator", () => {
    const generator = new CaseConferenceIdGenerator();
  
    it("should generate an ID with the correct format", () => {
      expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
      expect(generator.generate(789).data).toBe("CASE_CONF-789");
      expect(generator.generate("CONF").data).toBe("CASE_CONF-CONF");
    });
  
    it("should throw an error for null or undefined input", () => {
      expect(generator.generate(undefined)).toBeInstanceOf(FailedResult);
      expect(generator.generate(null)).toBeInstanceOf(FailedResult);
    });
  });