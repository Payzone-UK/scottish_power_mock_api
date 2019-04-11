export class ErrorProvider {

    /*
     * If the string s ends in a string that matches one of the error code, return the
     * description
     *
    matches_an_error_code(s: string): SPMessage {
        return (null);
    }
    */

}

/*
 * They return an array of messages
 */
export interface SPMessage {
    type: string;
    category: string;
    message: string;
}
/*
const reversalErrors = [
    ["ACCEPT", "SAP-REVACC", "Reversal Request Accepted"],
    ["REJECT", "SAP-ELIMIT", "Limit for maximum allowed reversals exceeded"],
    ["REJECT", "SAP-NALLOW", "Reversal not allowed via payment channel"],
    ["REJECT", "SAP-NEID", "External ID missing / invalid in the request"],
    ["REJECT", "SAP-NOMTCH", "UTRN is not recognized. Cannot match payment to reversal"],
    ["REJECT", "SAP-NPID", "Payment Identifier missing / invalid in the request"],
    ["REJECT", "SAP-NUTRN", "UTRN missing the request"],
    ["REJECT", "SAP-REVREJ", "Reversal Request Rejected.Time limit exceeded"]
]

const prepaymentErrors = [
    ["30005", "Unable to identify smart meter. If further assistance is required contact ScottishPower on &1"],
    ["30006", "Unable to accept prepayment payment. If further assistance is required contact ScottishPower on &1"],
    ["30030", "Meter currently not operating in prepayment mode. If further assistance is required contact ScottishPower on &1"],
    ["30031", "Unable to accept prepayment payment. If further assistance is required contact ScottishPower on &1"],
    ["30080", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1"],
    ["30081", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1"],
    ["30082", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1"],
    ["BLOCK", "Unable to accept card payment for account. If further assistance is required contact ScottishPower on &1"],
    ["NOCON", "Unable to match payment request to a live contract. Contact ScottishPower on &1 if further assistance is required."],
    ["NOENA", "Unable to activate payment channel"],
    ["NOHDS", "Unable to return UTRN to calling process – initiate reversal"],
    ["NOMAT", "Unable to identify account. If further assistance is required contact ScottishPower on &1."],
    ["NOPP", "According to our records your &2 meter is not currently in prepayment mode. Contact ScottishPower on &1 if further assistance is required."],
    ["NORET", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["NOSM", "According to our records this property does not yet have a &2 smart meter. If further assistance is required contact ScottishPower on &1."],
    ["NOSUP", "Unfortunately ScottishPower is no longer your &2 supplier. The site was lost to &3. You can contact them on &4 if further assistance is required."],
    ["FAIL", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["NPRVLG", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["NVMPXN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["NVMSN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["NVSRMN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["MNSFUN", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["INVMM", "According to our records your &2 meter is not currently in prepayment mode. Contact ScottishPower on &1 if further assistance is required contact ScottishPower on &1"],
    ["INVAMT", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."],
    ["INVIDF", "Temporary system issue – please try again later. If further assistance is required contact ScottishPower on &1."]
]

*/