import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function PUT(): Promise<NextResponse> {
    try {
        const userId = crypto.randomUUID();
        await prisma.user.create({
            data: {
                id: userId,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ userId });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}