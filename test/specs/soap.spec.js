"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var chai = require("chai");
var sinonChai = require("sinon-chai");
var sinon_1 = require("sinon");
var request = require("supertest");
var xml2js_1 = require("xml2js");
var app_1 = require("../app");
chai.use(sinonChai);
var ADD_XML = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <Add>\n      \t<a>2</a>\n      \t<b>3</b>\n      </Add>\n   </soapenv:Body>\n</soapenv:Envelope>";
var SUBTRACT_XML = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <Subtract>\n      \t<a>2</a>\n      \t<b>3</b>\n      </Subtract>\n   </soapenv:Body>\n</soapenv:Envelope>";
describe("CalculationService", function () {
    describe("wsdl", function () {
        var wsdlPath = app_1.SOAP_PATH + "?wsdl";
        it("should result in http status ok", function () {
            return request(app_1.app)
                .get(wsdlPath)
                .expect(200);
        });
        it("should result with xml body", function () {
            return request(app_1.app)
                .get(wsdlPath)
                .then(function (data) {
                chai_1.expect(data).not.to.be.undefined;
                chai_1.expect(data.text).to.be.a("string");
                return new Promise(function (resolve) {
                    xml2js_1.parseString(data.text, function (err, result) {
                        chai_1.expect(err).to.be["null"];
                        chai_1.expect(result).to.be.an("object");
                        resolve();
                    });
                });
            });
        });
    });
    describe("Add", function () {
        it("should result in http status ok", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(ADD_XML)
                .expect(200);
        });
        it("should result with xml body", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(ADD_XML)
                .then(function (data) {
                chai_1.expect(data).not.to.be.undefined;
                chai_1.expect(data.text).to.be.a("string");
                return new Promise(function (resolve) {
                    xml2js_1.parseString(data.text, function (err, result) {
                        chai_1.expect(err).to.be["null"];
                        chai_1.expect(result).to.be.an("object");
                        resolve();
                    });
                });
            });
        });
        it("should result with correct sum", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(ADD_XML)
                .then(function (data) {
                console.log(app_1.SOAP_PATH);
                return new Promise(function (resolve) {
                    xml2js_1.parseString(data.text, function (err, result) {
                        console.log("Result !" + result["soap:Envelope"]["soap:Body"][0]["AddResponse"][0]["result"]);
                        chai_1.expect(result["soap:Envelope"]["soap:Body"][0]["AddResponse"][0]["result"][0]).to.eql('5');
                        resolve();
                    });
                });
            });
        });
    });
    describe("Subtract", function () {
        it("should result in http status ok", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(SUBTRACT_XML)
                .expect(200);
        });
        it("should result with xml body", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(SUBTRACT_XML)
                .then(function (data) {
                chai_1.expect(data).not.to.be.undefined;
                chai_1.expect(data.text).to.be.a("string");
                return new Promise(function (resolve) {
                    xml2js_1.parseString(data.text, function (err, result) {
                        chai_1.expect(err).to.be["null"];
                        chai_1.expect(result).to.be.an("object");
                        resolve();
                    });
                });
            });
        });
        it("should result with correct sum", function () {
            return request(app_1.app)
                .post(app_1.SOAP_PATH)
                .send(SUBTRACT_XML)
                .then(function (data) {
                return new Promise(function (resolve) {
                    xml2js_1.parseString(data.text, function (err, result) {
                        chai_1.expect(result["soap:Envelope"]["soap:Body"][0]["SubtractResponse"][0]["result"][0]).to.eql('-1');
                        resolve();
                    });
                });
            });
        });
    });
});
describe("middleware", function () {
    it("should call middlewares as expected", function () {
        var afterSoapSpy = sinon_1.spy(app_1.controllers.middlewares, "afterSoap");
        var beforeSoapSpy = sinon_1.spy(app_1.controllers.middlewares, "beforeSoap");
        return request(app_1.app)
            .post(app_1.SOAP_PATH)
            .send(ADD_XML)
            .then(function () {
            chai_1.expect(afterSoapSpy).not.to.be.called;
            chai_1.expect(beforeSoapSpy).to.be.calledOnce;
        });
    });
});
describe(app_1.HELLO_WORLD_PATH, function () {
    var helloWorldSpy = sinon_1.spy(app_1.controllers, "helloWorld");
    it("should call " + app_1.HELLO_WORLD_PATH, function () {
        return request(app_1.app)
            .get(app_1.HELLO_WORLD_PATH)
            .expect(200)
            .then(function () {
            chai_1.expect(helloWorldSpy).to.be.calledOnce;
        });
    });
});
