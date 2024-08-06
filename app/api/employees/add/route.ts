import { NextRequest, NextResponse } from "next/server";





export async function POST (req: NextRequest) {
    try {
        
        const { name, email, address, phone, dateOfBirth, startDate, SSN, position, department, contract, salary, workTime, employeeNumber, bank, bankAccount, education } = await req.body; 


    } catch (error) {
        console.log('An error occurred while adding employee in route ', error);
        return NextResponse.json({message: "An error occurred while adding employee"}, {status: 500});
    }
}