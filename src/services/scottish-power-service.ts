export const scottishPowerService = {
    HTTPS_Port: {
        SI_PrepaymentRequest_Out(args: any ): void {
            console.log("SI_PrepaymentRequest_Out");

            const externalId = args["ExternalId"];
            const paymentIdentifier = args["PaymentIdentifier"];
            const paymentSource = args["PaymentSource"];
            const amount = args["Amount"];

            const guy = "hi";
        },
    }
};
