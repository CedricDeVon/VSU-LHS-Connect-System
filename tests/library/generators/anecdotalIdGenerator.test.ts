import { describe, it, expect } from "vitest";

import { FailedResult } from "~/library/results/failedResult";
import { SuccessfulResult } from "~/library/results/successfulResult";
import { AnecdotalIdGenerator } from "../../../library/generators/anecdotalIdGenerator";

describe("AnecdotalIdGenerator", () => {
  const generator = new AnecdotalIdGenerator();

  it("should generate an ID with the correct format", () => {
    expect(generator.generate(123)).toBeInstanceOf(SuccessfulResult);
    expect(generator.generate(123).data).toBe("ANEC-123");
    expect(generator.generate("ABC").data).toBe("ANEC-ABC");
  });

  it("should throw an error for null or undefined input", () => {
    expect(generator.generate(undefined)).toBeInstanceOf(FailedResult);
    expect(generator.generate(null)).toBeInstanceOf(FailedResult);
  });
});
