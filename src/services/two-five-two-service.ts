/**
 * This is the code called when a 251 SOAP request reaches the Mock SOAP
 * server.
 *
 * It should return syncronously, but also set a timer to cause a 252
 * SOAP request to be sent to the Product Server.
 *
 * The interval before the 252 is set randomly, to mimick the real scenario.
 *
 * @type {{HTTPS_Port: {SI_PrepaymentRequest_Out(args: any): void}}}
 */

import { EasySoap } from "../services/easy_soap";
import { ErrorService, ErrorMessageStructure } from "./error-service";

export const twoFiveTwoService = {
    HTTPS_Port: {
        SI_PrepaymentRequest_Out(args: any ): String {
            console.log("SI_PrepaymentRequest_Out called");

            const message = args["Message"];

            // Decide whether to simulate an error
            const isHintToProduceError = ErrorService.matches_an_error_code(message["PaymentIdentifier"]);

            const theResponse: SoapResponse252 = {
                externalId: message["ExternalID"],
                paymentIdentifier: message["PaymentIdentifier"],
                paymentSource: message["PaymentSource"],
                amount: message["Amount"],
                error: isHintToProduceError
            };

            // A minimum of two seconds, randomly up to ten
            let randomTime = 1000 + Math.floor((Math.random() * 1000) + 1);

            // Simulate the 252 not relying with a UTRN
            if (message["PaymentIdentifier"].endsWith("5000")) {
              randomTime = 1000000;
            }

            // Schedule the 252 reply
            setTimeout(send252, randomTime, theResponse);

            const theSyncResponse = "<Response></Response>";
            // Return synchronously
            return(theSyncResponse);
        }
    }
};

interface SoapResponse252 {
    externalId: string;
    paymentIdentifier: string;
    paymentSource: string;
    amount: string;
    error: ErrorMessageStructure;
}

function send252(p: SoapResponse252) {
    const easySoap = new EasySoap();

    const wsdl_url = process.env.PRODUCT_SERVER_URL + process.env.WSDL_252;
    const headers = {
        "Content-Type": "text/xml;charset=UTF-8"
    };

    const utrn = randomString(20); // "12345685245469513574";

    (async () => {
        const {response} = await easySoap.soapRequest(wsdl_url, headers,
            easySoap.get252XML(p.externalId,
                p.paymentIdentifier,
                utrn.toString(),
                p.error),
            10000);

        if (response.statusCode == 200) {
            console.log("Sent UTRN via 252 successfully - " + utrn.toString() );
        } else {
            console.log("252 Failed to be sent");
        }
    })();
}

/*
 * For testing, the utrl is the externalID reversed
 * Another way is to use a random number, but that
 * makes it harder to confirm that the utrn matches
 * the calling JSON
 * Math.floor((Math.random() * 200000) + 1);
 */
function reverse_a_number(n: string) {
    n = n + "";
    return n.split("").reverse().join("").substring(0, 10);
}

/*
 * Or use this way to create a UTRN
 */
function randomString(len: number) {
    const charSet: string = "0123456789";

    let randomString = "";
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
