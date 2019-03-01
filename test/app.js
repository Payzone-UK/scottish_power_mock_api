"use strict";
exports.__esModule = true;
var express = require("express");
var express_soap_1 = require("express-soap");
var calculator_1 = require("./wsdls/calculator");
var calculator_service_1 = require("./services/calculator-service");
exports.app = express();
exports.SOAP_PATH = "/soap";
exports.HELLO_WORLD_PATH = "/hello-world";
exports.controllers = {
    middlewares: {
        beforeSoap: function (req, res, next) { return next(); },
        afterSoap: function (req, res, next) { return next(); }
    },
    helloWorld: function (req, res, next) { return res.send('hello world'); }
};
exports.app.use(function (req, res, next) { return exports.controllers.middlewares.beforeSoap(req, res, next); });
exports.app.use(exports.SOAP_PATH, express_soap_1.soap({ services: { CalculatorService: calculator_service_1.calculatorService }, wsdl: calculator_1.wsdl }));
exports.app.use(function (req, res, next) { return exports.controllers.middlewares.afterSoap(req, res, next); });
exports.app.get(exports.HELLO_WORLD_PATH, function (req, res, next) { return exports.controllers.helloWorld(req, res, next); });
