import { NextRequest, NextResponse } from "next/server";




export async function GET (req: NextRequest) {
    try {
        
        const token = req.cookies.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        return NextResponse.json({ message: 'User is authenticated' }, { status: 200 });

    } catch (error) {
        console.error('An unexpected error happened in auth route:', error);
        return NextResponse.json({ message: 'An unexpected error happened' }, { status: 500 });
    }
}