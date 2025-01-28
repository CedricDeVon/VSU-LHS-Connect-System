import { describe, it, expect, beforeEach } from 'vitest';

import { FailedResult } from "../../../library/results/failedResult";
import { SuccessfulResult } from "../../../library/results/successfulResult";
import { SmallTextValidator } from "../../../library/validators/smallTextValidator";

describe('SmallTextValidator', () => {
    let validator: SmallTextValidator;

    beforeEach(() => {
        validator = new SmallTextValidator();
    });

    it('should return failed result if text is undefined', async () => {
        const result = await validator.validate(undefined as any);
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return failed result if text exceeds maximum length', async () => {
        const result = await validator.validate('a'.repeat(SmallTextValidator.maximumLimit + 1));
        expect(result).toBeInstanceOf(FailedResult);
    });

    it('should return successful result for text within the limit', async () => {
        const result = await validator.validate('short text');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });

    it('should return successful result for an empty string', async () => {
        const result = await validator.validate('');
        expect(result).toBeInstanceOf(SuccessfulResult);
    });
});
