"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRSecret = void 0;
const uuid_1 = require("uuid");
const generateQRSecret = (employeeId) => {
    const baseSecret = process.env.QRSECRET || "placeholder";
    const uniqueSecret = `${baseSecret}-${employeeId}-${(0, uuid_1.v4)()}`;
    return uniqueSecret;
};
exports.generateQRSecret = generateQRSecret;
