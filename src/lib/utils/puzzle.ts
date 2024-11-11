import { PUZZLE_START_DATE } from "@/constants";

export const coordinatesToBoard = (coordinates: { x: number; y: number, c?: number }[], boardSize: number): string[][] => {
    const board: string[][] = Array(boardSize).fill('').map(() => Array(boardSize).fill(''));
    coordinates.forEach(({x, y, c}) => {
        board[x][y] = c === null || c === undefined ? 'X' : c.toString();
    });
    return board;
}


export const getPuzzleNumber = (date: string): string => {
    const diffTime = Math.abs(new Date(date).getTime() - PUZZLE_START_DATE.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays.toString().padStart(3, '0');
}