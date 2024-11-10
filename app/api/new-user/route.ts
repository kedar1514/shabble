import { NextResponse } from "next/server";
import { createUser } from "@/services";


export async function PUT(): Promise<NextResponse> {
    try {
        const userId = await createUser();
        return NextResponse.json({ userId });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}