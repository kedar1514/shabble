export const coordinatesToBoard = (coordinates: { x: number; y: number, c: number }[], boardSize: number): string[][] => {
    const board: string[][] = Array(boardSize).fill('').map(() => Array(boardSize).fill(''));
    coordinates.forEach(({x, y, c}) => {
        board[x][y] = c.toString();  // Convert number to string
    });
    
    return board;
}