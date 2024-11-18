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
exports.AttendanceRecordService = void 0;
const baseService_1 = require("./baseService");
const attendanceRecord_1 = __importDefault(require("../models/attendanceRecord"));
class AttendanceRecordService extends baseService_1.BaseService {
    constructor() {
        super(attendanceRecord_1.default); // Pass the AttendanceRecord model to BaseService
    }
    // Override create
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("data", data);
            const attendanceRecord = yield this.model.create(data);
            return attendanceRecord;
        });
    }
}
exports.AttendanceRecordService = AttendanceRecordService;
