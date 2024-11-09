import { validateGuessCheckParams } from "@/lib";
import { checkGuess, getCurrentBoard, updateProgress } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const userId = request.headers.get('userId');

        const { isValid, errors, data } = validateGuessCheckParams(await request.json(), userId);
        if (!isValid || !data) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { date, boardSize, guess, attempts } = data;

        const currentBoard = await getCurrentBoard(date, boardSize);
        const isCorrect = checkGuess(currentBoard, guess);
        if (isCorrect) {
            await updateProgress(userId!, date, attempts);
        }
        return NextResponse.json({ isCorrect }, { status: 200 });
    } catch (error) {
        console.error("Error checking guess:", error);
        return NextResponse.json({ error: "Error checking guess" }, { status: 500 });
    }


}