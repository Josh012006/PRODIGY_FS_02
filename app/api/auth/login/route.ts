import connectDB from "@/server/config/connectDB";
import adminModel from "@/server/models/adminModel";
import { NextRequest, NextResponse } from "next/server";




export async function POST( req: NextRequest) {
    try {
        const { email, password } = await req.json();

        await connectDB();

        const user = await adminModel.findOne({
            email,
            password
        });

        if(user) {
            const response = NextResponse.json({message: 'Login successful!'}, {status: 200});

            response.cookies.set('token', JSON.stringify(user), {
                httpOnly: true,
                maxAge: 60 * 60 * 3, // 1 week
                sameSite: 'strict'
            });

            return response;
        }
        else {
            return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
        }

    } catch (error) {
        console.log("An error in the login route " + error);
        return NextResponse.json({message: 'Internal server error! Please try again later.'}, {status: 500});
    }
}