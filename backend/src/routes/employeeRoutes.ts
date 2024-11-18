import { BaseRoutes } from "./baseRoutes";
import { EmployeeController } from "../controllers/employeeController";
import Employee, { IEmployee } from "../models/employee";
import { EmployeeService } from "../services/employeeService";

export class EmployeeRoutes extends BaseRoutes<IEmployee> {
  constructor() {
    super(new EmployeeController());
  }

  protected initializeCustomRoutes() {
    const controller = this.controller as EmployeeController; // Cast to specific type

    this.router.get("/minimal", controller.getMinimalData);
    this.router.post("/toggle-attendance", controller.toggleAttendance);
  }
}


const employeeRoutes = new EmployeeRoutes();
export default employeeRoutes.router;