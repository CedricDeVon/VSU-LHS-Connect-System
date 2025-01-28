import { describe, it, expect, beforeEach } from 'vitest';

import { EmptyValidator } from "../../../library/validators/emptyValidator";
import { SuccessfulResult } from "../../../library/results/successfulResult";

describe('EmptyValidator', () => {
    let validator: EmptyValidator;

    beforeEach(() => {
        validator = new EmptyValidator();
    });

    it('should return successful result regardless of input', async () => {
        const result1 = await validator.validate('anything');
        const result2 = await validator.validate('');
        const result3 = await validator.validate(undefined as any);
        const result4 = await validator.validate(null as any);

        expect(result1).toBeInstanceOf(SuccessfulResult);
        expect(result2).toBeInstanceOf(SuccessfulResult);
        expect(result3).toBeInstanceOf(SuccessfulResult);
        expect(result4).toBeInstanceOf(SuccessfulResult);
    });
});
