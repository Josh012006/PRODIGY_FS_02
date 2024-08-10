import { NextRequest, NextResponse } from "next/server";






export async function GET(req: NextRequest) {
    try {
        
        const response = NextResponse.json({message: "Admin successfully logged out!"}, {status: 200});

        response.cookies.delete("token");

        return response;

    } catch (error) {
        console.log("An error in the logout route ", error);
        return NextResponse.json({message: "An error in the logout route."}, {status: 500});
    }
}