"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const attendanceRecordRoutes_1 = __importDefault(require("./routes/attendanceRecordRoutes"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
// Connect to the database
(0, db_1.default)();
mongoose_1.default.set('debug', true);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '', 'index.html'));
});
// Defined routes
app.use("/api/employees", employeeRoutes_1.default);
app.use("/api/attendance-records", attendanceRecordRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`);
});
