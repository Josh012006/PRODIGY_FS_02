import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import employeeModel from "@/server/models/employeeModel";

import dayjs from 'dayjs';
import connectDB from "@/server/config/connectDB";

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);




const UPLOAD_DIR = path.resolve("public/employees");

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        
        const formData = await req.formData();
        const body = Object.fromEntries(formData);

        const dateOfBirth: Date = dayjs(body.dateOfBirth as string, 'DD/MM/YYYY').toDate();
        const startDate: Date = dayjs(body.startDate as string, 'DD/MM/YYYY').toDate();

        console.log(dateOfBirth);
        const oldFile = body.oldFile;

        const file = (body.file) || null;

        if (file) {

            if(file instanceof File) {
                const buffer = Buffer.from(await file.arrayBuffer());
                if (!fs.existsSync(UPLOAD_DIR)) {
                    fs.mkdirSync(UPLOAD_DIR);
                }
            
                fs.writeFileSync(
                    path.resolve(UPLOAD_DIR, (body.file as File).name),
                    buffer
                );

                const pathToFile = path.resolve(UPLOAD_DIR, oldFile as string);

                fs.unlink(pathToFile, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                        throw Error("An error occurred while deleting employee's picture");
                    }
                    console.log('File deleted successfully');
                });
            }


            const updatedEmployee = {
                name: body.name,
                email: body.email,
                picture: (body.file as File).name,
                address: body.address,
                phone: body.phone,
                dateOfBirth,
                socialSecurityNumber: body.SSN,
                position: body.position,
                department: body.department,
                startDate,
                contractType: body.contract,
                salary: body.salary,
                workTime: body.workTime,
                employeeNumber: body.employeeNumber,
                bankAccount: body.bankAccount,
                bank: body.bank,
                educationLevel: body.education,
            };

            const saveInfos = await employeeModel.findByIdAndUpdate(body.id, updatedEmployee, {new: true});

            console.log(saveInfos);


        } else {
            return NextResponse.json({
                success: false,
            }, {status: 500});
        }
        
        return NextResponse.json({
            message: "Employee successfully updated"
        }, {status: 200});


    } catch (error) {
        console.log('An error occurred while updating employee in route ', error);
        return NextResponse.json({message: "An error occurred while updating employee"}, {status: 500});
    }
}