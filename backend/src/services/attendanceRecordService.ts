import { BaseService } from "./baseService";
import AttendanceRecord , { IAttendanceRecord } from "../models/attendanceRecord";
import  Employee  from "../models/employee";

export class AttendanceRecordService extends BaseService<IAttendanceRecord> {
  constructor() {
    super(AttendanceRecord); // Pass the AttendanceRecord model to BaseService
  }

  // Override create
  async create(data: Partial<IAttendanceRecord>): Promise<IAttendanceRecord> {
    console.log("data", data);
    const attendanceRecord = await this.model.create(data);
    return attendanceRecord;
  }
}
