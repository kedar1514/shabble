import { validateGuessCheckParams } from "@/lib";
import { checkGuess, getCurrentBoard, updateUserProgress } from "@/services";
import { checkGuessResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const userId = request.headers.get('userId');

        const { isValid, errors, data } = validateGuessCheckParams(await request.json(), userId);
        if (!isValid || !data) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { puzzleId, guess } = data;

        const currentBoard = await getCurrentBoard({ puzzleId });
        const isCorrect = checkGuess(currentBoard.board as { x: number, y: number }[], guess);
        const updatedUserProgress = await updateUserProgress({ userId: data.userId!, boardSize: currentBoard.boardSize, puzzleId: currentBoard.id, status: isCorrect ? 'CORRECT' : 'WRONG' });
        return NextResponse.json<checkGuessResponse>({ isCorrect, hintCount: updatedUserProgress.hintCount, gameStatus: updatedUserProgress.status, stars: updatedUserProgress.stars || undefined}, { status: 200 });
    } catch (error) {
        console.error("Error checking guess:", error);
        return NextResponse.json({ error: "Error checking guess" }, { status: 500 });
    }
}