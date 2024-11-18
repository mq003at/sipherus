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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const baseService_1 = require("./baseService");
const employee_1 = __importDefault(require("../models/employee"));
const qrSecret_1 = require("../utils/qrSecret");
const RealTimeStatus_1 = require("../types/RealTimeStatus");
const attendanceRecord_1 = __importDefault(require("../models/attendanceRecord"));
class EmployeeService extends baseService_1.BaseService {
    constructor() {
        super(employee_1.default);
    }
    // Retrieve all employees with selected fields only
    getMinimalEmployeeData() {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.model
                .find({}, "employeeId name currentStatus lastStatusUpdate")
                .exec();
            console.log("Queried employees:", employees);
            return employees;
        });
    }
    // Overiding employee create
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.employeeId) {
                throw new Error("Employee ID is required");
            }
            console.log("reach");
            data.qrSecret = (0, qrSecret_1.generateQRSecret)(data.employeeId);
            return _super.create.call(this, data);
        });
    }
    toggleAttendanceStatus(employeeId, qrSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.model.findById(employeeId);
            if (!employee) {
                throw new Error("Employee not found");
            }
            if (employee.qrSecret !== qrSecret)
                throw new Error("Authorization failed: Invalid QR Secret.");
            const newStatus = employee.currentStatus === RealTimeStatus_1.RealTimeStatus.PRESENT
                ? RealTimeStatus_1.RealTimeStatus.ABSENT
                : RealTimeStatus_1.RealTimeStatus.PRESENT;
            employee.currentStatus = newStatus;
            employee.lastStatusUpdate = new Date();
            yield employee.save();
            yield attendanceRecord_1.default.create({
                employeeId: employee._id,
                status: newStatus,
            });
            return employee;
        });
    }
}
exports.EmployeeService = EmployeeService;
