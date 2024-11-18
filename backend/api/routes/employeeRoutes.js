"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const baseRoutes_1 = require("./baseRoutes");
const employeeController_1 = require("../controllers/employeeController");
class EmployeeRoutes extends baseRoutes_1.BaseRoutes {
    constructor() {
        super(new employeeController_1.EmployeeController());
    }
    initializeCustomRoutes() {
        const controller = this.controller; // Cast to specific type
        this.router.get("/minimal", controller.getMinimalData);
        this.router.post("/toggle-attendance", controller.toggleAttendance);
    }
}
exports.EmployeeRoutes = EmployeeRoutes;
const employeeRoutes = new EmployeeRoutes();
exports.default = employeeRoutes.router;
