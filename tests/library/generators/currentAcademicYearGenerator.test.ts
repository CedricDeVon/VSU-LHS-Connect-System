import { describe, it, expect } from "vitest";

import { SuccessfulResult } from "~/library/results/successfulResult";
import { CurrentAcademicYearGenerator } from "../../../library/generators/currentAcademicYearGenerator";

describe("CurrentAcademicYearGenerator", () => {
    const generator = new CurrentAcademicYearGenerator();
  
    it("should generate the current academic year", () => {
      const year = new Date().getFullYear();
      expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
      expect(generator.generate().data).toBe(`${year}-${year + 1}`);
    });
  });