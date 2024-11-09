import { Tile } from '@/components';
import React from 'react'

interface BoardProps {
    board: string[][];
    guess: string[][];
    onTileClick?: (x: number, y: number, setIsLoading: (isLoading: boolean) => void) => void;
    gameStatus?: string;
    incorrectGuess?: boolean;
    className?: string;
    tileClassName?: string;
}

function Board({ board, guess, onTileClick, gameStatus, incorrectGuess, className, tileClassName }: BoardProps) {

    const boardSize = board.length;
    // console.log("board inside board", board);
    // console.log("boardSize", board[0][0]);
    
    
    return (
        <div className={` w-full grid grid-cols-${boardSize} grid-rows-${boardSize} gap-1 sm:gap-1.5 md:gap-2 aspect-square ${className}`}>
            {Array.from({ length: boardSize }, (_, row) => (
                Array.from({ length: boardSize }, (_, col) => (
                    <Tile 
                        key={`${row}-${col}`}
                        tileContent={board[row][col]} 
                        guessContent={guess[row][col]}
                        onClick={(setIsLoading) => onTileClick && onTileClick(row, col, setIsLoading)}
                        gameStatus={gameStatus}
                        incorrectGuess={incorrectGuess}
                        className={tileClassName}
                    />
                ))
            ))}
        </div>
    )
}

export default Board