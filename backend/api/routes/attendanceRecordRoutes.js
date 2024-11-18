"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoutes_1 = require("./baseRoutes");
const attendanceRecordController_1 = require("../controllers/attendanceRecordController");
class AttendanceRecordRoutes extends baseRoutes_1.BaseRoutes {
    constructor() {
        super(new attendanceRecordController_1.AttendanceRecordController());
    }
}
const attendanceRecordRoutes = new AttendanceRecordRoutes();
exports.default = attendanceRecordRoutes.router;
