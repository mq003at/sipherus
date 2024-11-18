import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { AttendanceRecordService } from "../services/attendanceRecordService";
import { IAttendanceRecord } from "../models/attendanceRecord";

export class AttendanceRecordController extends BaseController<IAttendanceRecord> {
  private attendanceRecordService: AttendanceRecordService;

  constructor() {
    super(new AttendanceRecordService());
    this.attendanceRecordService = new AttendanceRecordService();
  }

  // Override create to handle attendance logic
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const attendanceRecord = await this.attendanceRecordService.create(req.body);
      res.status(201).json(attendanceRecord);
    } catch (error) {
      next(error);
    }
  };
}
