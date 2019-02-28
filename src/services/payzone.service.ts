import * as http from "request";

import { PayzoneAuthenticateRequest, PayzoneAuthenticateResponse } from "../models/scottish_power.types";

export interface PayzoneService {
    authenticate(cid: string, auth: string): Promise<PayzoneAuthenticateResponse>;
}

/* Check the credentials provided by the merchant's tablet against the API's list
 * of cashier ids and application ids. Is this request from a genuine merchant ?
 */
export class PayzoneService implements PayzoneService {
    authenticate(cashierId: string, authorization: string) {
        const options = {
            method: "GET",
            headers: this.getHeaders(cashierId, authorization)
        };

        return new Promise<PayzoneAuthenticateResponse>(async (resolve, reject) => {
            const the_url = process.env.PAYZONE_API_BASE  + "/v1/merchant/remaining_credit";
            http.get(the_url,  options, (err, response, body) => {
                if (response.statusCode == 200) { // TODO What about 201 ? Check for success
                    const results = {};
                    console.log("Auth worked");

                    return resolve(<PayzoneAuthenticateResponse> results);
                } else {
                    console.log("Auth failed");
                    return reject(err);
                }
            });
        });
    }

    private getHeaders(cashierId: string, authorization: string): any {
        return {
            "Content-type": "application/json",
            authorization : authorization,
            cid: cashierId,
        };
    }
}
