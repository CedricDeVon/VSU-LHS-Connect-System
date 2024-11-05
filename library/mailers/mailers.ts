import { UserSignedUpMailer } from "./userSignedUpMailer";

export class Mailers {
    private static readonly _userSignedUpMailer: UserSignedUpMailer = new UserSignedUpMailer();

    public static get userSignedUpMailer(): UserSignedUpMailer {
        return Mailers._userSignedUpMailer;
    }
}
