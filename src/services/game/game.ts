import { prisma } from "@/lib";
import { getCurrentBoard } from "./puzzle";
import { MAX_HINTS } from "@/constants";
import { GameStatusResponse } from "@/types";
import { UserProgress } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

export const getUserProgress = async (userId: string, puzzleId: number): Promise<UserProgress> => {
    try {
        let userProgress;
        userProgress = await prisma.userProgress.findUnique({
            where: { userId_puzzleId: { userId, puzzleId } }
        });
        if (!userProgress) {
            userProgress = await prisma.userProgress.create({
                data: { userId, puzzleId }
            });
            return userProgress;
        }
        return userProgress;
    } catch (error) {
        console.error("Error fetching user progress:", error);
        throw error;
    }
}


interface UpdateUserProgressParams {
    userId: string;
    puzzleId: number;
    boardSize: number;
    hint?: { x: number, y: number, c: number };
    hintCount?: number;
    status?: string;
}

export const updateUserProgress = async ({ userId, puzzleId, boardSize, hint, status }: UpdateUserProgressParams): Promise<UserProgress> => {
    try {
        console.log("updateUserProgress", { userId, puzzleId, boardSize, hint, status });
        const userProgress = await getUserProgress(userId, puzzleId);
        console.log("userProgress in updateUserProgress", userProgress);
        
        if (hint) {
            const hintCoordinates = userProgress.hintCoordinates as { x: number, y: number }[];
            userProgress.hintCoordinates = [...hintCoordinates, hint];
            userProgress.hintCount += 1;
        }
        if (status === 'CORRECT' || status === 'WRONG') {
            if (status === 'CORRECT') {
                userProgress.status = 'won';
                userProgress.stars = Math.max(1, MAX_HINTS[boardSize as keyof typeof MAX_HINTS] - userProgress.hintCount);
            }
            else {
                const updatedHintCount = userProgress.hintCount + 2;
                if (updatedHintCount > MAX_HINTS[boardSize as keyof typeof MAX_HINTS]) {
                    userProgress.status = 'lost';
                }
                userProgress.hintCount = updatedHintCount;
            }
        }
        console.log("userProgress in updateUserProgress after", userProgress);
        
        const updatedUserProgress = await prisma.userProgress.update({
            where: { userId_puzzleId: { userId, puzzleId } },
            data: {
                ...userProgress,
                hintCoordinates: userProgress.hintCoordinates as InputJsonValue
            }
        });
        return updatedUserProgress;
    } catch (error) {
        console.error("Error updating user progress:", error);
        throw error;
    }

}


export const getGameStatus = async (date: string, boardSize: number, userId: string): Promise<GameStatusResponse> => {
    try {
        const currentBoard = await getCurrentBoard({ date, boardSize });
        const userProgress = await prisma.userProgress.findUnique({
            where: { userId_puzzleId: { userId, puzzleId: currentBoard.id } }
        });
        if (!userProgress) {
            const status: GameStatusResponse = {
                hintCoordinates: [],
                hintCount: 0,
                puzzleId: currentBoard.id,
                gameStatus: "playing"
            }
            return status;
        }
       
        const status: GameStatusResponse = {
            hintCoordinates: userProgress.hintCoordinates as { x: number, y: number, c: number }[],
            hintCount: userProgress.hintCount,
            puzzleId: currentBoard.id,
            gameStatus: userProgress.status as "playing" | "won" | "lost"
        }
        if (userProgress.status === 'won') {
            status.solutionCoordinates = currentBoard.board as { x: number, y: number }[];
        }
        return status;
    } catch (error) {
        console.error("Error fetching game status:", error);
        throw error;
    }

}