/*
 * This class will eventually encapsulate all of the SOAP communications with the
 * Scottish Power 251 API. For now it just mocks the interface so that we can test
 * the Payzone Tablet code
 */

import * as http from "request";
import * as winston from "winston";

import {
    PrepaymentRequest,
    PrepaymentResponse, SPMessage,
} from "../models/scottish_power.types";

export interface ScottishPowerPrepaymentsService {
    prepayment(request: PrepaymentRequest ): Promise<PrepaymentResponse>;
}

export class PrepaymentApiService implements ScottishPowerPrepaymentsService {

    // This will be the SOAP interface for Scottish Power, but for now we will mock it up
    // with a call to the BBC web site.
    prepayment(request: PrepaymentRequest ) {

        const amount = request.amount;
        const transaction_guid = request.transaction_guid;
        const payment_identifier = request.payment_identifier;

        const the_url = "http://bbc.co.uk/news";

        return new Promise<PrepaymentResponse>(async (resolve, reject) => {

            http.get(the_url, (err, response, body) => {

                if (response.statusCode == 200) { // TODO What about 201 ? Check for success
                    // const parsed_body = JSON.parse(body);
                    // const the_data = parsed_body["data"];

                    // Just to get it to complile
                    const spMessage: SPMessage = {
                        type: "Big",
                        category: "siamese",
                        message: "Miaow"
                    };

                    const prepaymentResponse: PrepaymentResponse = {
                      transaction_guid: "Some GUID",
                      payment_identifier: "Some Payment Ident",
                      utrn: "Some UTRN",
                      responseCode: "00",
                      messages: [spMessage]
                    };

                    return resolve(<PrepaymentResponse> prepaymentResponse);
                } else {
                    console.log("prepayment failed - " );
                    return reject(err);
                }
            });
        });
    }
}
