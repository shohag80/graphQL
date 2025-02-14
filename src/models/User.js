const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

module.exports = mongoose.model("User", UserSchema);
