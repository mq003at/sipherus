import { BaseService } from "./baseService";
import Employee, { IEmployee } from "../models/employee";
import { generateQRSecret } from "../utils/qrSecret";
import { RealTimeStatus } from "../types/RealTimeStatus";
import AttendanceRecord from "../models/attendanceRecord";

export class EmployeeService extends BaseService<IEmployee> {
  constructor() {
    super(Employee); 
  }

  // Retrieve all employees with selected fields only
  async getMinimalEmployeeData(): Promise<Partial<IEmployee>[]> {
    const employees = await this.model
      .find({}, "employeeId name currentStatus lastStatusUpdate")
      .exec();
    console.log("Queried employees:", employees); 
    return employees;
  }

  // Overiding employee create
  async create(data: Partial<IEmployee>): Promise<IEmployee> {
    if (!data.employeeId) {
      throw new Error("Employee ID is required");
    }
    console.log("reach")
    data.qrSecret = generateQRSecret(data.employeeId);
    return super.create(data);
  }

  async toggleAttendanceStatus(employeeId: string, qrSecret: string): Promise<IEmployee> {
    const employee = await this.model.findById(employeeId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (employee.qrSecret !== qrSecret) throw new Error("Authorization failed: Invalid QR Secret.");

    const newStatus =
      employee.currentStatus === RealTimeStatus.PRESENT
        ? RealTimeStatus.ABSENT
        : RealTimeStatus.PRESENT;

    employee.currentStatus = newStatus;
    employee.lastStatusUpdate = new Date();
    await employee.save();

    await AttendanceRecord.create({
      employeeId: employee._id,
      status: newStatus,
    });

    return employee;
  }
}
