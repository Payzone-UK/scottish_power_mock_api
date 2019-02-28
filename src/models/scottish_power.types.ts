export interface ScottishPowerRequest {
}

interface ScottishPowerResponse {
}

/*
 * They return an array of messages
 */
export interface SPMessage {
  type: string;
  category: string;
  message: string;
}

export interface PrepaymentRequest extends ScottishPowerRequest {
    amount: string;
    transaction_guid: string;
    payment_source: string;
    payment_identifier: string;
    utrn: string;
}

export interface PrepaymentResponse extends ScottishPowerResponse {
    transaction_guid: string;
    payment_identifier: string;
    utrn: string;
    responseCode: string;
    messages: Array<SPMessage>;
}

export interface PayzoneAuthenticateRequest {
    applicationId: string;
    cashierId: string;
}

export interface PayzoneAuthenticateResponse {
}