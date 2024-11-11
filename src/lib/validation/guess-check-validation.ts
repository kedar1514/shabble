import { z } from 'zod';
import { PuzzleCheckParams } from "@/types";

const guessCheckSchema = z.object({
    userId: z.string({
        required_error: 'User ID is required',
    }),
    puzzleId: z.coerce.number({
        required_error: 'Puzzle ID is required',
    }),
    guess: z.array(z.array(z.string()))
})

export function validateGuessCheckParams(body: PuzzleCheckParams, userId: string | null) {
    const result = guessCheckSchema.safeParse({
        userId,
        ...body
    });

    if (!result.success) {
        return {
            isValid: false,
            errors: result.error.errors.map(err => err.message),
            data: null,
        };
    }

    return {
        isValid: true,
        errors: [],
        data: result.data,
    };
}