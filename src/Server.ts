import logger from "morgan";
import express from "express";
import * as path from "path";
import { soap } from "express-soap";
import { calculatorService } from "./services/calculator-service";

export class Server {
    public app: express.Application;
    private db: any;

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

        const xml = require("fs").readFileSync("./wsdl/calculator.wsdl", "utf8");

        // Call http://localhost:3090/soap/calculation?wsdl
        this.app.use("/soap", soap({services: {CalculatorService: calculatorService}, wsdl: xml}));
    }
}
