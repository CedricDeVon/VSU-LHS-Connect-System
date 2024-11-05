import type { Result } from "../results/result";
import type { MailContent } from "./mailContent";

export abstract class Mailer {
    public abstract mail(mailContent: MailContent): Promise<Result>;
}
