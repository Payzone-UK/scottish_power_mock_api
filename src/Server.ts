import logger from "morgan";
import express from "express";

import * as path from "path";
import { soap } from "express-soap";
import { calculatorService } from "./services/calculator-service";
import { twoFiveTwoService } from "./services/two-five-two-service";
import { twoFiveThreeService } from "./services/two-five-three-service";

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    public static run(): Server {
        console.log("Mock API for Scottish Power prepayments - running now");

        const server = new Server();

        server.configure();

        return server;
    }

    private configure(): void {

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(logger("dev"));

        const wsdl251 = require("fs").readFileSync("./wsdl/PrepaymentRequest_Out_251.wsdl", "utf8");
        this.app.use("/scottish-power-251", soap({ services: {SP_PAYOUTLET_D_SI_PrepaymentRequest_Out: twoFiveTwoService }, wsdl: wsdl251}));

        const wsdl253 = require("fs").readFileSync("./wsdl/PrepaymentReversalSyncRequest_Out_253_254.wsdl", "utf8");
        this.app.use("/scottish-power-253", soap({ services: {SP_PAYOUTLET_D_SI_PrepaymentRequest_Out: twoFiveThreeService }, wsdl: wsdl253}));

        // Call http://localhost:3090/soap/calculation?wsdl
        const calculatorXml = require("fs").readFileSync("./wsdl/calculator.wsdl", "utf8");
        this.app.use("/calculator", soap({ services: {CalculatorService: calculatorService }, wsdl: calculatorXml}));
    }
}
