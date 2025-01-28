import { describe, it, expect } from "vitest";

import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { AnecdotalReportIdGenerator } from "../../../library/generators/anecdotalReportIdGenerator";

describe("AnecdotalReportIdGenerator", () => {
    const generator = new AnecdotalReportIdGenerator();
  
    it("should throw an error for null or undefined input", () => {
      expect(generator.generate(undefined)).toBeInstanceOf(FailedResult);
      expect(generator.generate(null)).toBeInstanceOf(FailedResult);
    });

    it("should generate an ID with the correct format", () => {
      expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
      expect(generator.generate(456).data).toBe("ANEC_REP-456");
      expect(generator.generate("XYZ").data).toBe("ANEC_REP-XYZ");
    });
  });
  