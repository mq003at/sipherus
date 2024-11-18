import mongoose, { Schema, Document } from "mongoose";
import { RealTimeStatus } from "../types/RealTimeStatus";
import BaseModel, { baseSchema } from "./baseModel";

export interface IAttendanceRecord extends Document {
    employeeId: mongoose.Schema.Types.ObjectId;
    status: RealTimeStatus;
}

const attendanceRecordSchema: Schema<IAttendanceRecord> = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true},
    status: {
        type: String,
        enum: Object.values(RealTimeStatus), 
        default: RealTimeStatus.ABSENT,
      },
})

attendanceRecordSchema.add(baseSchema.obj);

const AttendanceRecord = mongoose.model<IAttendanceRecord>('AttendanceRecord', attendanceRecordSchema);
export default AttendanceRecord;

