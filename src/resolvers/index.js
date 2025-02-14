const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const resolvers = {
    Query: {
        async login(_, { email, password }) {
            const user = await User.findOne({ email });
            if (!user) throw new Error("User not found");

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error("Invalid password");

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });
            return { token, user };
        },

        async getAllEmployees() {
            return await Employee.find();
        },

        async getEmployeeById(_, { id }) {
            return await Employee.findById(id);
        },

        async getEmployeesByDesignationOrDepartment(_, { designation, department }) {
            const query = {};
            if (designation) query.designation = designation;
            if (department) query.department = department;
            return await Employee.find(query);
        }
    },

    Mutation: {
        async signup(_, { username, email, password }) {
            const existingUser = await User.findOne({ email });

            if (existingUser) 
                throw new Error("Email already in use");

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ 
                username, 
                email, 
                password: hashedPassword 
            });
            return await user.save();
        },

        async addEmployee(_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) {
            const existingEmployee = await Employee.findOne({ email });
            
            if (existingEmployee) throw new Error("Employee with this email already exists");

            const employee = new Employee({
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                department,
                employee_photo
            });
            return await employee.save();
        },

        async updateEmployee(_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) {
            const updates = {};
            if (first_name) updates.first_name = first_name;
            if (last_name) updates.last_name = last_name;
            if (email) updates.email = email;
            if (gender) updates.gender = gender;
            if (designation) updates.designation = designation;
            if (salary) updates.salary = salary;
            if (date_of_joining) updates.date_of_joining = date_of_joining;
            if (department) updates.department = department;
            if (employee_photo) updates.employee_photo = employee_photo;

            updates.updated_at = new Date();

            return await Employee.findByIdAndUpdate(id, updates, { new: true });
        },

        async deleteEmployee(_, { id }) {
            await Employee.findByIdAndDelete(id);
            return "Employee deleted successfully";
        }
    }
};

module.exports = resolvers;
