import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { EmployeeService } from "../services/employeeService";
import { IEmployee } from "../models/employee";

export class EmployeeController extends BaseController<IEmployee> {
  private employeeService: EmployeeService;

  constructor() {
    super(new EmployeeService());
    this.employeeService = new EmployeeService();
  }

  // Get employees with minimal data
  public getMinimalData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employees = await this.employeeService.getMinimalEmployeeData();
      res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  };

  // Toggle attendance status and create a record
  public toggleAttendance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, qrSecret } = req.body;

      if (!qrSecret) {
        res.status(400).json({ message: "QR Secret is required" });
        return;
      }

      const updatedEmployee = await this.employeeService.toggleAttendanceStatus(id, qrSecret);
      res.status(200).json(updatedEmployee);
    } catch (error: any) {
      if (error.message === "Authorization failed: Invalid QR Secret.") {
        res.status(403).json({ message: "Authorization failed: Invalid QR Secret." });
      } else if (error.message === "Employee not found") {
        res.status(404).json({ message: "Employee not found" });
      } else {
        next(error);
      }
    }
  };
}
