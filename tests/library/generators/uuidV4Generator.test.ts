import { describe, it, expect } from "vitest";

import { SuccessfulResult } from "~/library/results/successfulResult";
import { UUIDV4Generator } from "../../../library/generators/uuidV4Generator";

describe("UUIDV4Generator", () => {
    const generator = new UUIDV4Generator();
  
    it("should generate a valid UUIDv4", () => {
      const uuid = generator.generate().data;
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(generator.generate()).toBeInstanceOf(SuccessfulResult);
      expect(uuid).toMatch(uuidRegex);
    });
  });
  