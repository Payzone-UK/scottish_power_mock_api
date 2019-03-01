"use strict";
exports.__esModule = true;
exports.calculatorService = {
    ICalculator: {
        Add: function (_a, res) {
            var a = _a.a, b = _a.b;
            res({
                result: a + b
            });
        },
        Subtract: function (_a, res) {
            var a = _a.a, b = _a.b;
            res({
                result: a - b
            });
        }
    }
};
