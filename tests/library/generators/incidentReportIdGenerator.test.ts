import { describe, it, expect } from "vitest";

import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { IncidentReportIdGenerator } from "../../../library/generators/incidentReportIdGenerator";

describe("IncidentReportIdGenerator", () => {
    const generator = new IncidentReportIdGenerator();
    
    it("should throw an error for null or undefined input", () => {
      expect(generator.generate(undefined)).toBeInstanceOf(FailedResult);
      expect(generator.generate(null)).toBeInstanceOf(FailedResult);
    });
  
    it("should generate an ID with the correct format", () => {
      expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
      expect(generator.generate(202).data).toBe("INC_REP-202");
      expect(generator.generate("REP").data).toBe("INC_REP-REP");
    });
});
  