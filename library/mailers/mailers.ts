import { UserSignedUpMailer } from "./userSignedUpMailer";

export class Mailers {
    public static readonly userSignedUpMailer: UserSignedUpMailer = new UserSignedUpMailer();
}
