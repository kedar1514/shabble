import { PuzzleCheckParams } from "@/types/puzzle";

export function validateGuessCheckParams(body: PuzzleCheckParams, userId: string | null) {
    const errors: string[] = [];

    if (!userId) {
        errors.push('User ID is required');
    }

    // Check if body exists and is an object
    if (!body || typeof body !== 'object') {
        errors.push('Invalid request body');
        return {
            isValid: false,
            errors,
            data: null
        };
    }

    const { boardSize, date, guess, attempts } = body;

    // Validate boardSize
    if (!boardSize || isNaN(boardSize) || boardSize < 1) {
        errors.push('Invalid board size');
    }

    // Validate date format
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        errors.push('Invalid date format. Use YYYY-MM-DD');
    }

    // Validate attempts
    if (!Number.isInteger(attempts) || attempts < 0) {
        errors.push('Invalid attempts count');
    }

    if(guess.length !== boardSize || guess.some((row: string[]) => row.length !== boardSize)) {
        errors.push('Invalid guess dimensions');
    }

    return {
        isValid: errors.length === 0,
        errors,
        data: { boardSize, date, guess, attempts }
    };
}