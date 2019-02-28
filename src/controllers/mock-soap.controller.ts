import { Request, Response, Router, NextFunction } from "express";



export class MockSoapController {

    constructor() {
        console.log("Hello !!!");
    }

    public static create() {
        console.log("MockSoapController,create() called");

        const xml = require("fs").readFileSync("./wsdl/PrepaymentRequest_Out_251.wsdl", "utf8");

        const soap = require("soap");
        const url = "http://example.com/wsdl?wsdl";
        const args = {name: "value"};
        soap.createClientAsync(url).then((client: any) => {
            return client.MyFunctionAsync(args);
        }).then((result: any) => {
            console.log(result);
        });
    }
}
