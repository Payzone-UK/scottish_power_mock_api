import logger from "morgan";
import express from "express";

import * as path from "path";
import { soap } from "express-soap";
import { calculatorService } from "./services/calculator-service";
import { scottishPowerService } from "./services/scottish-power-service";


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

        const scottishPowerXml = require("fs").readFileSync("./wsdl/PrepaymentRequest_Out_251.wsdl", "utf8");
        this.app.use("/scottish-power-251", soap({ services: {SP_PAYOUTLET_D_SI_PrepaymentRequest_Out: scottishPowerService }, wsdl: scottishPowerXml}));

        // Call http://localhost:3090/soap/calculation?wsdl
        const calculatorXml = require("fs").readFileSync("./wsdl/calculator.wsdl", "utf8");
        this.app.use("/calculator", soap({ services: {CalculatorService: calculatorService }, wsdl: calculatorXml}));
    }
}
