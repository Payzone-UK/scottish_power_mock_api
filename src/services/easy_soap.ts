import { ErrorMessageStructure } from "./error-service";

const axios = require("axios");

/**
 * @author Caleb Lemoine
 * @param {string} url endpoint URL
 * @param {string} headers  HTTP headers, can be string or object
 * @param {string} xml SOAP envelope, can be read from file or passed as string
 * @param {int} timeout Milliseconds before timing out request
 * @promise response
 * @reject {error}
 * @fulfill {body,statusCode}
 * @returns {Promise.response{body,statusCode}}
 */

export class EasySoap {
    soapRequest(url: string, headers: any, xml: string, timeout = 10000): any {
        console.log("The XML=" + xml);
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url,
                headers,
                data: xml,
                timeout,
            }).then((response: any) => {
                resolve({
                    response: {
                        body: response.data,
                        statusCode: response.status,
                    },
                });
            }).catch((error: any) => {
                if (error.response) {
                    console.log("SOAP FAIL: ${error}");
                    reject(error.response.data);
                } else {
                    console.log("SOAP FAIL: ${error}");
                    reject(error);
                }
            });
        });
    }

    get252XML(externalId: string, paymentIdentifier: string, utrn: string, error: any): string {
        let xmlForError: String = "";

        if (error) {
            xmlForError = " <Message>" +
                "             <Type>" + error[0] + "</Type>" +
                "             <Code>" + error[1] + "</Code>" +
                "             <Text>" + error[2] + "</Text>" +
                "           </Message>";
        }

        const retVal = ("<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "   <soapenv:Header/>" +
            "   <soapenv:Body>" +
            "      <ED_PrepaymentResponseOutput_252>" +
            "         <Response>" +
            "            <ExternalID>" + externalId + "</ExternalID>" +
            "            <PaymentIdentifier>" + paymentIdentifier + "</PaymentIdentifier>" +
            "            <Utrn>" + utrn + "</Utrn>" +
            "         </Response>" +
            "         <Messages>" +
            xmlForError +
            "         </Messages>" +
            "      </ED_PrepaymentResponseOutput_252>" +
            "   </soapenv:Body>" +
            "</soapenv:Envelope>");
        return(retVal);
    }

    get254XML(externalId: string, paymentIdentifier: string, utrn: string, error: any): string {
        let xmlForError: String = "";

        if (error) {
            xmlForError = " <Message>" +
                "             <Type>" + error[0] + "</Type>" +
                "             <Code>" + error[1] + "</Code>" +
                "             <Text>" + error[2] + "</Text>" +
                "           </Message>";
        }

        const retVal = ("<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "   <soapenv:Header/>" +
            "   <soapenv:Body>" +
            "      <ns0:MT_PrepaymentReversalResponseOutput_253_254 xmlns:ns0=\"urn:scottishpower.com:SMART:PAYOUTLET:ISU1:PrepaymentReversalSyncRequest:253_254\">" +
            "         <Response>" +
            "            <ExternalID>" + externalId + "</ExternalID>" +
            "            <PaymentIdentifier>" + paymentIdentifier + "</PaymentIdentifier>" +
            "            <UTRN>" + utrn + "</UTRN>" +
            "         </Response>" +
            "         <Messages>" +
            xmlForError +
            "         </Messages>" +
            "      </ns0:MT_PrepaymentReversalResponseOutput_253_254>" +
            "   </soapenv:Body>" +
            "</soapenv:Envelope>");
        return(retVal);
    }
}

/*
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <ED_PrepaymentResponseOutput_252>
	      <Response>
	      	<ExternalID>PayzoneXYZ</ExternalID>
	      	<PaymentIdentifier>1234567765432</PaymentIdentifier>
	      	<Utrn>100.01</Utrn>
	       </Response>
	       <Messages>
	         <Message>
		         <Type>A</Type>
		         <Code>B</Code>
		         <Text>T</Text>
	         </Message>
	       </Messages>
      </ED_PrepaymentResponseOutput_252>
   </soapenv:Body>
</soapenv:Envelope>
 */

/*
<?xml version="1.0" encoding="UTF-8"?>
<ns0:MT_PrepaymentReversalResponseOutput_253_254 xmlns:ns0="urn:scottishpower.com:SMART:PAYOUTLET:ISU1:PrepaymentReversalSyncRequest:253_254">
   <Response>
      <ExternalID>MDCXO9QF2K1001X0800MJKL</ExternalID>
      <PaymentIdentifier>6541256611653559</PaymentIdentifier>
      <UTRN>85425635214513013369</UTRN>
      <Messages>
         <Message>
            <Type>S</Type>
            <Code>SAP-REVACC</Code>
            <Text>Reversal Request Accepted</Text>
         </Message>
      </Messages>
   </Response>
</ns0:MT_PrepaymentReversalResponseOutput_253_254>
 */