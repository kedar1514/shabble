export type PuzzleCheckParams = {
    date: string;
    boardSize: number;
    guess: string[][];
    attempts: number;
}

export type Statistics = {
    played: number;
    totalStars: number;
    currentStreak: number;
    bestStreak: number;
    starDistribution: number[];
}