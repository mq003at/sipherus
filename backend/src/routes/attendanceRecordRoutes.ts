import { BaseRoutes } from "./baseRoutes";
import { AttendanceRecordController } from "../controllers/attendanceRecordController";
import { IAttendanceRecord } from "../models/attendanceRecord";

class AttendanceRecordRoutes extends BaseRoutes<IAttendanceRecord> {
  constructor() {
    super(new AttendanceRecordController());
  }
}

const attendanceRecordRoutes = new AttendanceRecordRoutes();
export default attendanceRecordRoutes.router;
