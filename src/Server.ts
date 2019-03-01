import logger from "morgan";
import express from "express";
import methodOverride from "method-override";
import * as path from "path";
import { soap } from "express-soap";

export class Server {
    public app: express.Application;
    private db: any;

    constructor() {
        this.app = express();


    }

    public static run(): Server {
        console.log("The Scottish Power Product Server is Running now");

        const server = new Server();

        server.configure();

        return server;
    }

    private configure(): void {

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(logger("dev"));

        this.app.use(methodOverride());
        const xml = require("fs").readFileSync("./wsdl/calculator.wsdl", "utf8");

        // Call http://localhost:3090/soap/calculation?wsdl
        this.app.use("/soap/calculation", soap({
            services: {
                CalculatorService: {
                    Calculator: {
                        Add({a, b}, res) {
                            res({
                                result: a + b
                            });
                        },
                        Subtract({a, b}, res) {
                            res({
                                result: a - b
                            });
                        }
                    }
                }
            },
            wsdl: xml
        }));
    }
}
