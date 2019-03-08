export const scottishPowerService = {
    HTTPS_Port: {
        SI_PrepaymentRequest_Out({a}: {a: number}, res: Function): void {
            console.log("SI_PrepaymentRequest_Out");
            res({
                result: a
            });
        },
    }
};
