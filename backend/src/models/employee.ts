import mongoose, { Schema, Document } from "mongoose";
import { RealTimeStatus } from "../types/RealTimeStatus";
import BaseModel, { baseSchema } from "./baseModel";

export interface IEmployee extends Document {
    name: string;
    email: string;
    employeeId: string;
    qrSecret: string;
    currentStatus: RealTimeStatus;
    lastStatusUpdate: Date;
}

const employeeSchema: Schema<IEmployee> = new Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    employeeId: {type: String, required: true, unique: true},
    qrSecret: {type: String},
    currentStatus: {
        type: String,
        enum: Object.values(RealTimeStatus), 
        default: RealTimeStatus.ABSENT,
      },
    lastStatusUpdate: { type: Date, default: Date.now },
})

employeeSchema.add(baseSchema.obj);

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
export default Employee;

