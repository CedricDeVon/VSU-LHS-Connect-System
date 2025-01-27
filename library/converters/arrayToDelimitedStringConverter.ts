import { Converter } from "./converter";
import type { Result } from "../results/result";
import { FailedResult } from "../results/failedResult";
import { SuccessfulResult } from "../results/successfulResult";

export class ArrayToDelimitedStringConverter extends Converter {
    public convert(data: { items: any[], delimeter: string }): Result {
        try {
            const { items, delimeter } = data;
            if (data === undefined || data === null ||
                items === undefined || items === null ||
                delimeter === undefined || delimeter === null) {
                throw new Error('Arguments must neither be undefined nor null');
            }

            let delimitedString: string = '';
            const delimeterLimit: number = items.length - 1;
            items.forEach((item, index) => {
                delimitedString += `${item}`;
                if (index < delimeterLimit) {
                    delimitedString += delimeter;
                }
            });

            return new SuccessfulResult(delimitedString);

        } catch (error: any) {
            return new FailedResult(error.message);
        }
    }
}
