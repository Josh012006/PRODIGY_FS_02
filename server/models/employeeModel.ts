import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: String,
    address: String,
    phone: String,
    dateOfBirth: Date,
    socialSecurityNumber: String,
    position: String,
    department: String,
    startDate: Date,
    contractType: String,
    salary: Number,
    workTime: String,
    employeeNumber: {
        type: String,
        unique: true,
    },
    bankAccount: String,
    bank: String,
    educationLevel: String,
});



export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);