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
exports.AttendanceRecordController = void 0;
const baseController_1 = require("./baseController");
const attendanceRecordService_1 = require("../services/attendanceRecordService");
class AttendanceRecordController extends baseController_1.BaseController {
    constructor() {
        super(new attendanceRecordService_1.AttendanceRecordService());
        // Override create to handle attendance logic
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attendanceRecord = yield this.attendanceRecordService.create(req.body);
                res.status(201).json(attendanceRecord);
            }
            catch (error) {
                next(error);
            }
        });
        this.attendanceRecordService = new attendanceRecordService_1.AttendanceRecordService();
    }
}
exports.AttendanceRecordController = AttendanceRecordController;
