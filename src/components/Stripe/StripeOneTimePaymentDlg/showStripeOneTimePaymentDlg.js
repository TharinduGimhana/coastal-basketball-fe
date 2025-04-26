import { createConfirmation } from "react-confirm";
import StripeOneTimePaymentDlg from "./StripeOneTimePaymentDlg";

export const showStripeOneTimePaymentDlg = createConfirmation(StripeOneTimePaymentDlg);
