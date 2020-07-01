import logger from "morgan";
import express from "express";

import * as path from "path";
import { soap } from "express-soap";
import { twoFiveOneService } from "./services/two-five-one-service";
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

        const twoFiveOneXml = require("fs").readFileSync("./wsdl/PrepaymentRequest_Out_251.wsdl", "utf8");
        this.app.use("/scottish-power-251", soap({ services: {SP_PAYOUTLET_D_SI_PrepaymentRequest_Out: twoFiveOneService }, wsdl: twoFiveOneXml}));

        const twoFiveThreeXml = require("fs").readFileSync("./wsdl/PrepaymentReversalSyncRequest_Out_253_254.wsdl", "utf8");
        this.app.use("/scottish-power-253", soap({ services: {SP_PAYOUTLET_D_SI_PrepaymentReversalSyncRequest_Out: twoFiveThreeService }, wsdl: twoFiveThreeXml}));
    }
}
