export class ErrorService {

    /*
     * If the string s ends in a string that matches one of the error code, return the
     * description
     */
    public static matches_an_error_code(s: string): any {

        for ( let i = 0; i < prepaymentErrors.length; i++) {
            const error = prepaymentErrors[i];

            if (s.endsWith(error[0].toString() )) {
                return ( ["F", error[1], error[2]] );
            }
        }

        return ( ["S", "", ""] );
    }
}

/*
 * They return an array of messages
 */
export interface ErrorMessageStructure {
    type: string;
    category: string;
    message: string;
}

const prepaymentErrors = [
    [4001, "30005", "Unable to identify smart meter. If further assistance is required contact ScottishPower on 1"],
    [4002, "30006", "Unable to accept prepayment payment. If further assistance is required contact ScottishPower on 1"],
    [4003, "30030", "Meter currently not operating in prepayment mode. If further assistance is required contact ScottishPower on 1"],
    [4004, "30031", "Unable to accept prepayment payment. If further assistance is required contact ScottishPower on 1"],
    [4005, "30080", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1"],
    [4006, "30081", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1"],
    [4007, "30082", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1"],
    [4008, "BLOCK", "Unable to accept card payment for account. If further assistance is required contact ScottishPower on 1"],
    [4009, "NOCON", "Unable to match payment request to a live contract. Contact ScottishPower on 1 if further assistance is required."],
    [4010, "NOENA", "Unable to activate payment channel"],
    [4011, "NOHDS", "Unable to return UTRN to calling process – initiate reversal"],
    [4012, "NOMAT", "Unable to identify account. If further assistance is required contact ScottishPower on 1."],
    [4013, "NOPP", "According to our records your &2 meter is not currently in prepayment mode. Contact ScottishPower on 1 if further assistance is required."],
    [4014, "NORET", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4015, "NOSM", "According to our records this property does not yet have a &2 smart meter. If further assistance is required contact ScottishPower on 1."],
    [4016, "NOSUP", "Unfortunately ScottishPower is no longer your &2 supplier. The site was lost to &3. You can contact them on &4 if further assistance is required."],
    [4017, "FAIL", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4018, "NPRVLG", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4019, "NVMPXN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4020, "NVMSN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4021, "NVSRMN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4022, "MNSFUN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4023, "INVMM", "According to our records your &2 meter is not currently in prepayment mode. Contact ScottishPower on 1 if further assistance is required contact ScottishPower on 1"],
    [4024, "INVAMT", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."],
    [4025, "INVIDF", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on 1."]
];

const reversalErrors = [
    [4030 , "ACCEPT", "SAP-REVACC", "Reversal Request Accepted"],
    [4031 , "REJECT", "SAP-ELIMIT", "Limit for maximum allowed reversals exceeded"],
    [4032 , "REJECT", "SAP-NALLOW", "Reversal not allowed via payment channel"],
    [4033 , "REJECT", "SAP-NEID", "External ID missing / invalid in the request"],
    [4034 , "REJECT", "SAP-NOMTCH", "UTRN is not recognized. Cannot match payment to reversal"],
    [4035 , "REJECT", "SAP-NPID", "Payment Identifier missing / invalid in the request"],
    [4036 , "REJECT", "SAP-NUTRN", "UTRN missing the request"],
    [4037 , "REJECT", "SAP-REVREJ", "Reversal Request Rejected.Time limit exceeded"]
];