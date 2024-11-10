export interface GameStatusResponse {
    hintCoordinates: { x: number, y: number, c: number }[];
    solutionCoordinates?: { x: number, y: number }[];
    hintCount: number;
    puzzleId: number;
    gameStatus: "playing" | "won" | "lost";
}

export interface getHintResponse {
    adjacentCount: number;
    hintCount: number
}

export interface checkGuessResponse {
    isCorrect: boolean;
    hintCount: number;
    gameStatus: "playing" | "won" | "lost";
}