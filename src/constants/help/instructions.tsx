import { Board } from '@/components';
import React from 'react';

const guess1: string[][] = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "X", "X", "X", "X", ""],
    ["", "", "X", "X", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
]

const guess2: string[][] = [
    ["", "", "", "", "X", ""],
    ["", "", "", "X", "X", ""],
    ["", "", "", "X", "", ""],
    ["", "", "X", "X", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
]

const guess3: string[][] = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["X", "X", "X", "", ""],
    ["", "", "X", "X", ""],
    ["", "", "", "", ""]
]

const guess4: string[][] = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "X", "", ""],
    ["", "", "X", "", "X", "", ""],
    ["", "", "X", "X", "X", "X", ""]
]

export const instructions: readonly (string | JSX.Element)[][] = [
    [
        <>
            Solve the <span className="font-bold">SHABBLE</span> in 10 attempts or fewer.
        </>,
        "The goal is to find the hidden shape!",
        <>
            You will earn a star for every attempt you have remaining once the <span className="font-bold">SHABBLE</span> is solved ⭐
        </>
    ],
    [
        <>
            The hidden shape is a continuous block of tiles.
        </>,
        <>
            <div className='flex justify-between'>
                <Board
                    board={guess1}
                    guess={guess1}
                    onTileClick={() => { }}
                    guessMode={true}
                    incorrectGuess={false}
                    className='w-[20%] !gap-0.5'
                    tileClassName='!rounded'
                />
                <Board
                    board={guess2}
                    guess={guess2}
                    onTileClick={() => { }}
                    guessMode={true}
                    incorrectGuess={false}
                    className='w-[20%] !gap-0.5'
                    tileClassName='!rounded'
                />
                <Board
                    board={guess3}
                    guess={guess3}
                    onTileClick={() => { }}
                    guessMode={true}
                    incorrectGuess={false}
                    className='w-[20%] !gap-0.5'
                    tileClassName='!rounded'
                />
                 <Board
                    board={guess4}
                    guess={guess4}
                    onTileClick={() => { }}
                    guessMode={true}
                    incorrectGuess={false}
                    className='w-[20%] !gap-0.5'
                    tileClassName='!rounded'
                />
            </div>
        </>,
        <>
            The number of tiles in the hidden shape is equal to the length of the side of the board.
        </>
    ],
    [
        "Clicking on any tile will reveal the number of blocks of shape adjacent to it."
    ]
] as const;
