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

export const twoFiveOneService = {
    HTTPS_Port: {
        SI_PrepaymentRequest_Out(args: any ): void {
            console.log("SI_PrepaymentRequest_Out called");

            const message = args["Message"];

            const  packet: Packet = {
                externalId: message["ExternalID"],
                paymentIdentifier: message["PaymentIdentifier"],
                paymentSource: message["PaymentSource"],
                amount: message["Amount"],
            };

            // A minimum of two seconds, randomly up to ten
            const randomTime = 2000 + Math.floor((Math.random() * 2000) + 1);

            // Schedule the 252 reply
            setTimeout(send252, randomTime, packet);

            // Return synchronously
            return;
        }
    }
};

interface Packet {
    externalId: string;
    paymentIdentifier: string;
    paymentSource: string;
    amount: string;
}

function send252(p: Packet) {
    const easySoap = new EasySoap();

    const wsdl_url = process.env.PRODUCT_SERVER_URL + '/scottish-power-252';
    const headers = {
        "Content-Type": "text/xml;charset=UTF-8"
    };

    const randomUTRN = reverse_a_number(p.externalId);

    (async () => {
        try {
            const {response} = await easySoap.soapRequest(wsdl_url, headers,
                easySoap.get252XML(p.externalId,
                    p.paymentIdentifier,
                    randomUTRN.toString() ),
                10000);

            if (response.statusCode == 200) {
                console.log("Sent UTRN via 252 successfully - " + randomUTRN.toString() );
            } else {
                console.log("252 Failed to be sent");
            }
        } catch ( error ) {
            console.error(error);
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
    return n.split("").reverse().join("");
}
