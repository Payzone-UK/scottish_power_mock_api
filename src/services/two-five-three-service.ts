/**
 * This is the code called when a 253 SOAP request reaches the Mock SOAP
 * server.
 *
 */

import { EasySoap } from "../services/easy_soap";

export const twoFiveThreeService = {
    HTTPS_Port: {
        // Need an ExternalID, PaymentIdentifier and UTRN
        SI_PrepaymentReversalSyncRequest_Out(args: any ): String {
            console.log("SI_PrepaymentReversalSyncRequest_Out called");

            const message = args["Message"];

            const errorMessages = ["S", "SAP-REVACC", "Reversal Request Accepted"];

            const easySoap = new EasySoap();

            const successfulResponse = easySoap.get254XML(message["ExternalID"],
                                            message["PaymentIdentifier"],
                                            message["Utrn"],
                                            errorMessages);

            return(successfulResponse);
        }
    }
};
