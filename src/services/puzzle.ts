export async function fetchBoard(boardSize: number) {

    // const randomCoordinates: { x: number, y: number }[] = [];
    // for (let i = 0; i < 5; i++) {
    //     const x = Math.floor(Math.random() * boardSize);
    //     const y = Math.floor(Math.random() * boardSize);
    //     randomCoordinates.push({ x, y });
    // }

    const randomCoordinates = [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 3 }
    ];
    const board = Array.from({ length: boardSize }, (_, row) =>
        Array.from({ length: boardSize }, (_, col) =>
            randomCoordinates.some(({ x, y }) => x === row && y === col) ? 'X' : ''
        )
    );
    return board;
}