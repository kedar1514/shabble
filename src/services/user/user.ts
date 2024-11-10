import { prisma } from "@/lib";
import crypto from 'crypto';

export const createUser = async (): Promise<string> => {
    try {
        const userId = crypto.randomBytes(4).toString('hex').toUpperCase();
        await prisma.user.create({
            data: { id: userId, createdAt: new Date() }
        });
        return userId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}