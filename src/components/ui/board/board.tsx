import { Tile } from '@/components';
import React from 'react'

interface BoardProps {
    board: string[][];
    onTileClick?: (x: number, y: number) => void;
    guessMode?: boolean;
    showIncorrect?: boolean;
}

function Board({ board, onTileClick, guessMode, showIncorrect }: BoardProps) {

    const boardSize = board.length;
    // console.log("board inside board", board);
    // console.log("boardSize", board[0][0]);
    
    
    return (
        <div className='flex flex-col items-center justify-around'>
            {Array.from({ length: boardSize }, (_, row) => (
                <div key={row} className='flex w-full items-center justify-around'>
                    {Array.from({ length: boardSize }, (_, col) => (
                        <React.Fragment key={col}>
                            <Tile 
                                tileContent={board[row][col]} 
                                onClick={() => onTileClick && onTileClick(row, col)}
                                guessMode={guessMode}
                                showIncorrect={showIncorrect}
                            />
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board