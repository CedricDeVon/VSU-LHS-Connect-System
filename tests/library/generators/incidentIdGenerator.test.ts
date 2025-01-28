import { describe, it, expect } from "vitest";

import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { IncidentIdGenerator } from "../../../library/generators/incidentIdGenerator";

describe("IncidentIdGenerator", () => {
    const generator = new IncidentIdGenerator();
  
    it("should throw an error for null or undefined input", () => {
      expect(generator.generate(undefined)).toBeInstanceOf(FailedResult);
      expect(generator.generate(null)).toBeInstanceOf(FailedResult);
    });

    it("should generate an ID with the correct format", () => {
      expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
      expect(generator.generate(101).data).toBe("INC-101");
      expect(generator.generate("ERR").data).toBe("INC-ERR");
    });
});
  