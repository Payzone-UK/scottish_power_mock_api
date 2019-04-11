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

    get252XML(externalId: string, paymentIdentifier: string, utrn: string): string {
        return("<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "   <soapenv:Header/>" +
            "   <soapenv:Body>" +
            "      <ED_PrepaymentResponseOutput_252>" +
            "         <Response>" +
            "            <ExternalID>" + externalId + "</ExternalID>" +
            "            <PaymentIdentifier>" + paymentIdentifier + "</PaymentIdentifier>" +
            "            <Utrn>" + utrn + "</Utrn>" +
            "         </Response>" +
            "         <Messages>" +
            "           <Message>" +
            "             <Type>A</Type>" +
            "             <Code>B</Code>" +
            "             <Text>T</Text>" +
            "           </Message>" +
            "         </Messages>" +
            "      </ED_PrepaymentResponseOutput_252>" +
            "   </soapenv:Body>" +
            "</soapenv:Envelope>");
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