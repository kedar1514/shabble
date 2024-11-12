import { MAX_HINTS } from "@/constants";

export type PuzzleCheckParams = {
  date: string;
  boardSize: number;
  guess: string[][];
  attempts: number;
}

export type StatisticsProps = {
  played: number;
  totalStars: number;
  currentStreak: number;
  bestStreak: number;
  starDistribution: number[];
}

export type GameState = "playing" | "won" | "lost" | "guess-loading" | "guessing" | "tile-loading"

export interface GameSettings {
  puzzleId: number;
  date: string;
  boardSize: keyof typeof MAX_HINTS;
  hints: number;
  board: string[][];
  guess: string[][];
  guessTileCount: number;
  gameStatus: GameState;
  stars: number;
  statistics: {
    played: number;
    totalStars: number;
    currentStreak: number;
    bestStreak: number;
    starDistribution: number[];
  };
}