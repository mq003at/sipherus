import mongoose from "mongoose";
import connectDb from "./config/db";
import dotenv from "dotenv";
import express from "express";
import employeeRoutes  from "./routes/employeeRoutes";
import attendanceRecordRoutes  from "./routes/attendanceRecordRoutes";
import path from "path";
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Connect to the database
connectDb();
mongoose.set('debug', true);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Defined routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance-records", attendanceRecordRoutes);

app.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`);
});