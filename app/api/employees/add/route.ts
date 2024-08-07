import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import employeeModel from "@/server/models/employeeModel";

import dayjs from 'dayjs';
import connectDB from "@/server/config/connectDB";



const UPLOAD_DIR = path.resolve("public/employees");

export async function POST (req: NextRequest) {
    try {

        await connectDB();
        
        const formData = await req.formData();
        const body = Object.fromEntries(formData);

        console.log(body);

        const file = (body.file as Blob) || null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            if (!fs.existsSync(UPLOAD_DIR)) {
                fs.mkdirSync(UPLOAD_DIR);
            }
        
            fs.writeFileSync(
                path.resolve(UPLOAD_DIR, (body.file as File).name),
                buffer
            );


            const newEmployee = new employeeModel({
                name: body.name,
                email: body.email,
                picture: (body.file as File).name,
                address: body.address,
                phone: body.phone,
                dateOfBirth: dayjs(body.dateOfBirth as string, 'DD/MM/YYYY').toDate(),
                socialSecurityNumber: body.SSN,
                position: body.position,
                department: body.department,
                startDate: dayjs(body.startDate as string, 'DD/MM/YYYY').toDate(),
                contractType: body.contract,
                salary: body.salary,
                workTime: body.workTime,
                employeeNumber: body.employeeNumber,
                bankAccount: body.bankAccount,
                bank: body.bank,
                educationLevel: body.education,
            });

            const saveInfos = await newEmployee.save();

            console.log(saveInfos);


        } else {
            return NextResponse.json({
                success: false,
            }, {status: 500});
        }
        
        return NextResponse.json({
            success: true,
            name: (body.file as File).name,
        }, {status: 201});




    } catch (error) {
        console.log('An error occurred while adding employee in route ', error);
        return NextResponse.json({message: "An error occurred while adding employee"}, {status: 500});
    }
}