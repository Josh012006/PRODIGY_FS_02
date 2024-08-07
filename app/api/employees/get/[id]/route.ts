import connectDB from "@/server/config/connectDB";
import employeeModel from "@/server/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";





export async function GET (req: NextRequest, {params} : {params: {id: string}}) {
    try {
        
        const id = params.id;

        await connectDB();
        
        const employee = await employeeModel.findById(id);

        if (!employee) {
            return NextResponse.json({message: "Employee not found"}, {status: 404});
        }

        return NextResponse.json(employee, {status: 200});

    } catch (error) {
        console.log("An error occurred in find employee by id route ", error);
        return NextResponse.json({message: "An error while trying to find employee by id"}, {status: 500});
    }
}