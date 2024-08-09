import connectDB from "@/server/config/connectDB";
import employeeModel from "@/server/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";

import path from "path";
import fs from "fs";



const UPLOAD_DIR = path.resolve("public/employees");


export async function DELETE (req: NextRequest, {params}: {params: {id: string}}) {
    try {
        
        const { id } = params;

        await connectDB();

        const employee = await employeeModel.findById(id);

        if (!employee) {
            return NextResponse.json({message: "Employee not found"}, {status: 404});
        }

        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }

        const pathToFile = path.resolve(UPLOAD_DIR, employee.picture);

        fs.unlink(pathToFile, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
                throw Error("An error occurred while deleting employee's picture");
            }
            console.log('File deleted successfully');
        });

        await employeeModel.findByIdAndDelete(id);

        return NextResponse.json({message: "Employee deleted successfully"}, {status: 200});

    } catch (error) {
        console.log("An error occurred in delete employee route ", error);
        return NextResponse.json({message: "An error occurred while deleting employee"}, {status: 500});
    }
}