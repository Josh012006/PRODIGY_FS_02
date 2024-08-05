import connectDB from "@/server/config/connectDB";
import employeeModel from "@/server/models/employeeModel";
import { NextRequest } from "next/server";






export async function GET (req:NextRequest) {
    try {
        
        await connectDB();

        const employees = (await employeeModel.find({})).reverse();

        return Response.json(employees, {status: 200});

    } catch (error) {
        console.log("An error while getting all employees ", error);
        return Response.json({message: "An error occured while getting all employees"}, {status: 500});
    }
}