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
            "      <Response>" +
            "        <ExternalID>" + externalId + "</ExternalID>\n" +
            "        <PaymentIdentifier>" + paymentIdentifier + "</PaymentIdentifier>" +
            "        <UTRN>" + utrn + "</UTRN>" +
            "      </Response>" +
            "      <Messages>" +
            "        <Message>" +
            "          <Type>S</Type>" +
            "          <Code>SUCC</Code>" +
            "          <Text>UTRN number generated:" + utrn + "</Text>" +
            "        </Message>" +
            "      </Messages>" +
            "      </ED_PrepaymentResponseOutput_252>" +
            "   </soapenv:Body>" +
            "</soapenv:Envelope>");
    }
    /*
     *   Example
        {
            "Response": {
                "ExternalID": "PO3916933031",
                "PaymentIdentifier": "63322691609475249980",
                "UTRN": "74362727063220161728"
            },
            "Messages": {
                "Message": {
                    "Type": "S",
                    "Code": "SUCC",
                    "Text": "UTRN number generated:74362727063220161728"
                }
            }
         }
     */
}

