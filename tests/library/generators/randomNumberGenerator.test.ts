import { describe, it, expect } from "vitest";

import { SuccessfulResult } from "~/library/results/successfulResult";
import { RandomNumberGenerator } from "../../../library/generators/randomNumberGenerator";

describe("RandomNumberGenerator", () => {
    const generator = new RandomNumberGenerator();
  
    it("should generate a number between 1 and 100", () => {
      const randomNumber = generator.generate().data;
      expect(generator.generate()).toBeInstanceOf(SuccessfulResult);
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(100);
    });
  });
  