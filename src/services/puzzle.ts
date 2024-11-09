import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchBoard(boardSize: number): Promise<{ x: number, y: number }[]> {
    const randomCoordinates: { x: number, y: number }[] = [];
    
    // Start with a random position
    const startX = Math.floor(Math.random() * boardSize);
    const startY = Math.floor(Math.random() * boardSize);
    randomCoordinates.push({ x: startX, y: startY });

    // Generate 5-7 continuous coordinates
    const targetCount = boardSize; // Random number between 5-7
    
    while (randomCoordinates.length < targetCount) {
        const randIndex = Math.floor(Math.random() * randomCoordinates.length);
        const lastCoord = randomCoordinates[randIndex];
        
        // Possible directions: up, down, left, right
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 }
        ];
        
        // Shuffle directions for randomness
        directions.sort(() => Math.random() - 0.5);
        
        // Try each direction until we find a valid new position
        for (const { dx, dy } of directions) {
            const newX = lastCoord.x + dx;
            const newY = lastCoord.y + dy;
            
            // Check if the new position is valid and not already used
            if (
                newX >= 0 && newX < boardSize &&
                newY >= 0 && newY < boardSize &&
                !randomCoordinates.some(coord => coord.x === newX && coord.y === newY)
            ) {
                randomCoordinates.push({ x: newX, y: newY });
                break;
            }
        }
    }

    // const board = Array.from({ length: boardSize }, (_, row) =>
    //     Array.from({ length: boardSize }, (_, col) =>
    //         randomCoordinates.some(({ x, y }) => x === row && y === col) ? 'X' : ''
    //     )
    // );
    return randomCoordinates;
}

export async function getCurrentBoard(currentDate: string, boardSize: number): Promise<{ x: number, y: number }[]> {
    try {
        const puzzleDate = new Date(currentDate);
        let dailyPuzzle = await prisma.dailyPuzzle.findUnique({
            where: {
                date: puzzleDate
            }
        });
        if (!dailyPuzzle) {
            const board = await fetchBoard(boardSize);
            dailyPuzzle = await prisma.dailyPuzzle.create({
                data: {
                    date: puzzleDate,
                    board,
                    boardSize
                }
            });
        }
        return dailyPuzzle.board as { x: number, y: number }[];
    } catch (error) {
        console.error("Error fetching current board:", error);
        throw error;
    }
}
export function getAdjacentCount(board: { x: number, y: number }[], boardSize: number, x: number, y: number): number {
    let adjacentCount = 0;
    const directions = [
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 0, y: 0 }
    ];

    directions.forEach(({ x: dx, y: dy }) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
            adjacentCount += board.some(({ x, y }) => x === newX && y === newY) ? 1 : 0;
        }
    });
    return adjacentCount;
}

export function checkGuess(board: { x: number, y: number }[], guess: string[][]): boolean {
    // console.log("board in checkGuess", board);
    // console.log("guess in checkGuess", guess);
    return board.every(({ x, y }) => guess[x][y] === 'X');
}

export async function updateProgress(userId: string, date: string, attempts: number): Promise<void> {
    try {
        const puzzleDate = new Date(date);
        let progress = await prisma.userProgress.findUnique({
            where: {
                userId_puzzleDate: { userId, puzzleDate }
            }
        });
        if (!progress) {
            progress = await prisma.userProgress.create({
                data: { userId, puzzleDate, completed: true, moves: attempts }
            });
        } else {
            progress = await prisma.userProgress.update({
                where: { userId_puzzleDate: { userId, puzzleDate } },
                data: { completed: true, moves: attempts }
            });
        }
    } catch (error) {
        console.error("Error updating progress:", error);
        throw error;
    }
}