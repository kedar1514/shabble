import { Tile } from '@/components';
import React from 'react'

interface BoardProps {
    board: string[][];
}

function Board({ board }: BoardProps) {

    const boardSize = board.length;
    // console.log("board inside board", board);
    // console.log("boardSize", board[0][0]);
    
    
    return (
        <div className='flex flex-col items-center justify-around w-[440px] h-[440px]'>
            {Array.from({ length: boardSize }, (_, row) => (
                <div key={row} className='flex w-full items-center justify-around'>
                    {Array.from({ length: boardSize }, (_, col) => (
                        <React.Fragment key={col}>
                            <Tile tileContent={board[row][col]} />
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board