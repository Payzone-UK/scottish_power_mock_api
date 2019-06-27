/**
 * This is the code called when a 253 SOAP request reaches the Mock SOAP
 * server.
 *
 */

export const twoFiveThreeService = {

    HTTPS_Port: {
        // Need an ExternalID, PaymentIdentifier and UTRN
        SI_PrepaymentReversalSyncRequest_Out(args: any ) {
            console.log("‌SI_PrepaymentReversalSyncRequest_Out called");

            const message = args["Request"];

            return({
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

/*
 Example request, POST this

 Content-Type = text/xml;charset=UTF-8

 <soapenv:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>
    <soapenv:Header/>
    <soapenv:Body>
        <ns0:MT_PrepaymentReversalRequestInput_253_254 xmlns:ns0="urn:scottishpower.com:SMART:PAYOUTLET:ISU1:PrepaymentReversalSyncRequest:253_254">
           <Request>
              <ExternalID>016026180710</ExternalID>
              <PaymentIdentifier>6332269160261807100</PaymentIdentifier>
              <UTRN>12345685245469513574</UTRN>
           </Request>
        </ns0:MT_PrepaymentReversalRequestInput_253_254>
    </soapenv:Body>
</soapenv:Envelope>

 */