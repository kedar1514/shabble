import { Board } from '@/components';
import React from 'react';


const guesses: string[][][] = [
    [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["X", "X", "X", "", ""],
        ["", "", "X", "X", ""],
        ["", "", "", "", ""]
    ],
    [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "X", "X", "X", "X", ""],
        ["", "", "X", "X", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""]
    ],
    [
        ["", "", "", "", "X", ""],
        ["", "", "", "X", "X", ""],
        ["", "", "", "X", "", ""],
        ["", "", "X", "X", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""]
    ],
    [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "X", "", ""],
        ["", "", "X", "", "X", "", ""],
        ["", "", "X", "X", "X", "X", ""]
    ],

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
            <div className='flex flex-wrap justify-around gap-4'>
                {guesses.map((guess, index) => (
                    <React.Fragment key={index}>
                        <div className='flex flex-col items-center gap-2 !w-[40%] md:!w-[20%]  h-full'>
                            <Board
                                key={index}
                                board={guess}
                                guess={guess}
                                onTileClick={() => { }}
                                guessMode={true}
                                incorrectGuess={false}
                                className='!gap-0.5'
                                tileClassName='!rounded'
                            />
                            <div className='text-sm'>{guess.length} x {guess[0].length}</div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>,
        <>
            The number of tiles in the hidden shape is equal to the length of the board.
        </>
    ],
    [
        "Clicking on any tile will reveal the number of blocks of shape adjacent to it."
    ]
] as const;
