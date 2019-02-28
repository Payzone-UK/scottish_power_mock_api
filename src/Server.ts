import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import * as path from "path";
import { MockSoapController } from "./controllers/mock-soap.controller";
// import { MyPort }  from "./services/mock_soap.service";


export class Server {
    public app: express.Application;
    private db: any;

    constructor() {
        this.app = express();
        const soap = require("soap");

        const xml = require("fs").readFileSync("./wsdl/PrepaymentRequest_Out_251.wsdl", "utf8");

        this.app.use(bodyParser.raw({type: function() { return true; }, limit: "5mb"}));
        this.app.listen(8001, function() {
            // Note: /wsdl route will be handled by soap module
            // and all other routes & middleware will continue to work
            // soap.listen(this.app, "/wsdl", MockSoapService, xml);
        });
    }

    public static run(): Server {
        console.log("The Scottish Power Product Server is Running");

        const server = new Server();

        server.configure();
        // MockSoapController.create();

        return server;
    }

    private configure(): void {

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride());
    }
}
