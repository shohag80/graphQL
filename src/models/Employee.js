const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true, min: 1000 },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true },
    employee_photo: { type: String },
    created_at: {
        type: Date,
        default: Date.now,
        get: (value) => {
            return new Date(value).toLocaleDateString("en-GB"); // Formats as "DD-MM-YYYY"
        }
    },
    updated_at: {
        type: Date,
        get: (value) => {
            return new Date(value).toLocaleDateString("en-GB");
        }
    }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
