export async function fetchBoard(boardSize: number) {
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

    const board = Array.from({ length: boardSize }, (_, row) =>
        Array.from({ length: boardSize }, (_, col) =>
            randomCoordinates.some(({ x, y }) => x === row && y === col) ? 'X' : ''
        )
    );
    return board;
}

export function getAdjacentCount(board: string[][], x: number, y: number) {
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
        if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
            adjacentCount += board[newX][newY] === 'X' ? 1 : 0;
        }
    });
    return adjacentCount;
}

export function checkGuess(board: string[][], guess: string[][]) {
    return board.every((row, i) => row.every((cell, j) => cell === guess[i][j]));
}