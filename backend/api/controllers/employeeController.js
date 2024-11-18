"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const baseController_1 = require("./baseController");
const employeeService_1 = require("../services/employeeService");
class EmployeeController extends baseController_1.BaseController {
    constructor() {
        super(new employeeService_1.EmployeeService());
        // Get employees with minimal data
        this.getMinimalData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getMinimalEmployeeData();
                res.status(200).json(employees);
            }
            catch (error) {
                next(error);
            }
        });
        // Toggle attendance status and create a record
        this.toggleAttendance = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, qrSecret } = req.body;
                if (!qrSecret) {
                    res.status(400).json({ message: "QR Secret is required" });
                    return;
                }
                const updatedEmployee = yield this.employeeService.toggleAttendanceStatus(id, qrSecret);
                res.status(200).json(updatedEmployee);
            }
            catch (error) {
                if (error.message === "Authorization failed: Invalid QR Secret.") {
                    res.status(403).json({ message: "Authorization failed: Invalid QR Secret." });
                }
                else if (error.message === "Employee not found") {
                    res.status(404).json({ message: "Employee not found" });
                }
                else {
                    next(error);
                }
            }
        });
        this.employeeService = new employeeService_1.EmployeeService();
    }
}
exports.EmployeeController = EmployeeController;
