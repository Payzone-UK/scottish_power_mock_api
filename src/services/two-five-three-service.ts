/**
 * This is the code called when a 253 SOAP request reaches the Mock SOAP
 * server.
 *
 * 253 is the reversal message.  This one returns straight away.
 *
 */

import { EasySoap } from "../services/easy_soap";

export const twoFiveThreeService = {
    HTTPS_Port: {
        SI_PrepaymentReversalSyncRequest_Out(args: any ): any {
            console.log("SI_ReversalRequest_Out called");

            const message = args["Request"];

            return ( {
                Response: {
                    ExternalID: message["ExternalID"],
                    PaymentIdentifier: message["PaymentIdentifier"],
                    UTRN: message["UTRN"],
                    Messages: {
                        Message: {
                            Type: "S",
                            Code: "SAP-REVACC",
                            Text: "Reversal Request Accepted"
                        }
                    }
                }
            });
        }
    }
};

/* Example response
<SOAP:Envelope xmlns: SOAP='http://schemas.xmlsoap.org/soap/envelope/'>
    <SOAP: Header/>
    <SOAP: Body xmlns: xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns: xsd='http://www.w3.org/2001/XMLSchema'>
        <ns0:MT_PrepaymentReversalResponseOutput_253_254 xmlns:
                                                         ns0='urn:scottishpower.com:SMART:PAYOUTLET:ISU1:PrepaymentReversalSyncRequest:253_254'>
            <Response>
                <ExternalID>PO2259291031</ExternalID>
                <PaymentIdentifier>633226999432990146</PaymentIdentifier>
                <UTRN>7402469095996046875</UTRN>
                <Messages>
                    <Message>
                        <Type>S</Type>
                        <Code>SAP-REVACC</Code>
                        <Text>Reversal Request Accepted</Text>
                    </Message>
                </Messages>
            </Response>
        </ns0: MT_PrepaymentReversalResponseOutput_253_254>
    </SOAP: Body>
</SOAP: Envelope>
 */
