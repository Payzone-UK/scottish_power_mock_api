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

    get252XML(externalID: string, paymentIdentifier: string, utrn: string, error: any): string {
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
            "            <ExternalID>" + externalID + "</ExternalID>" +
            "            <PaymentIdentifier>" + paymentIdentifier + "</PaymentIdentifier>" +
            "            <utrn>" + utrn + "</utrn>" +
            "         </Response>" +
            "         <Messages>" +
            xmlForError +
            "         </Messages>" +
            "      </ED_PrepaymentResponseOutput_252>" +
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